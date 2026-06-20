import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { clamp } from '../../utils';
import { objectMove } from './objectMove';
import type { DraggableItemProps } from './types';

const TIMING = { duration: 200 };

/**
 * A single reorderable row. Long-press to lift, drag to a new slot; the other
 * rows reflow around it. The dragged row tracks the finger 1:1 while everything
 * else eases into place on the UI thread (timing, no spring).
 */
export function DraggableItem({
  id,
  initialIndex,
  positions,
  count,
  itemHeight,
  longPressDelay,
  onReorder,
  children,
}: DraggableItemProps) {
  // Seed from the prop, never from `positions.value`, to avoid reading a shared
  // value during render.
  const top = useSharedValue(initialIndex * itemHeight);
  const startTop = useSharedValue(0);
  const isActive = useSharedValue(false);

  // Follow slot changes (caused by other rows) unless we're the one dragging.
  useAnimatedReaction(
    () => positions.value[id],
    (current, previous) => {
      if (current != null && current !== previous && !isActive.value) {
        top.value = withTiming(current * itemHeight, TIMING);
      }
    },
  );

  const pan = Gesture.Pan()
    .activateAfterLongPress(longPressDelay)
    .onStart(() => {
      isActive.value = true;
      startTop.value = positions.value[id] * itemHeight;
    })
    .onUpdate((e) => {
      top.value = startTop.value + e.translationY;
      const newIndex = clamp(Math.round(top.value / itemHeight), 0, count - 1);
      const oldIndex = positions.value[id];
      if (newIndex !== oldIndex) {
        positions.value = objectMove(positions.value, oldIndex, newIndex);
      }
    })
    .onEnd(() => {
      top.value = withTiming(positions.value[id] * itemHeight, TIMING);
    })
    .onFinalize(() => {
      if (isActive.value) {
        isActive.value = false;
        runOnJS(onReorder)(positions.value);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: top.value },
      { scale: withTiming(isActive.value ? 1.03 : 1, TIMING) },
    ],
    zIndex: isActive.value ? 10 : 0,
    shadowOpacity: withTiming(isActive.value ? 0.18 : 0),
    elevation: isActive.value ? 8 : 0,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.item, { height: itemHeight }, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});

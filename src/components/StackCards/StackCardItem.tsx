import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { StackCardItemProps } from './types';

const SPRING = { damping: 16, stiffness: 160 };

/**
 * One card in the stack. The front card can be flung up (or tapped); it flies
 * off the top, then settles into the back slot — so cycling reads as "tuck
 * behind", never an abrupt hide.
 */
export function StackCardItem({
  pos,
  total,
  visibleCount,
  offset,
  scaleStep,
  cardHeight,
  onSendToBack,
  children,
}: StackCardItemProps) {
  const visible = pos < visibleCount;
  const isFront = pos === 0;
  const isBackMost = pos === total - 1;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(pos * offset);
  const scale = useSharedValue(1 - pos * scaleStep);
  const opacity = useSharedValue(visible ? 1 : 0);
  const prevPos = useRef(pos);

  useEffect(() => {
    // This card just wrapped from front (0) to the back slot: glide it down
    // into the stack from wherever the fly-off left it.
    const wrappedToBack = prevPos.current === 0 && isBackMost && total > 1;
    if (wrappedToBack) {
      translateX.value = withTiming(0, { duration: 280 });
      translateY.value = withTiming(pos * offset, { duration: 320 });
      scale.value = withTiming(1 - pos * scaleStep, { duration: 320 });
      opacity.value = withTiming(visible ? 1 : 0, { duration: 280 });
    } else {
      translateX.value = withSpring(0, SPRING);
      translateY.value = withSpring(pos * offset, SPRING);
      scale.value = withSpring(1 - pos * scaleStep, SPRING);
      opacity.value = withTiming(visible ? 1 : 0, { duration: 220 });
    }
    prevPos.current = pos;
  }, [pos, offset, scaleStep, visible, isBackMost, total, translateX, translateY, scale, opacity]);

  function flyToBack() {
    'worklet';
    translateY.value = withTiming(-cardHeight * 0.75, { duration: 220 }, (finished) => {
      if (finished) runOnJS(onSendToBack)();
    });
    scale.value = withTiming(0.92, { duration: 220 });
  }

  const pan = Gesture.Pan()
    .enabled(isFront)
    .activeOffsetY(-10)
    .onUpdate((e) => {
      translateY.value = Math.min(0, e.translationY);
      translateX.value = e.translationX * 0.25;
    })
    .onEnd((e) => {
      if (-e.translationY > cardHeight * 0.28 || e.velocityY < -800) {
        flyToBack();
      } else {
        translateX.value = withSpring(0, SPRING);
        translateY.value = withSpring(0, SPRING);
      }
    });

  const tap = Gesture.Tap()
    .enabled(isFront)
    .onEnd(() => {
      flyToBack();
    });

  const gesture = Gesture.Exclusive(pan, tap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        pointerEvents={isFront ? 'auto' : 'none'}
        style={[styles.card, { height: cardHeight, zIndex: visibleCount - pos }, animatedStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

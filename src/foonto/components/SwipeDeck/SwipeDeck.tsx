import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type { FoontoStyle } from '../../types';
import { STACK_SIZE } from './constants';
import { SwipeCard } from './SwipeCard';
import type { SwipeDeckProps, SwipeDirection } from './types';

/**
 * A Tinder-style deck of swipeable cards. Only the top card is interactive;
 * the cards behind it scale up and rise into place — driven continuously by the
 * top card's drag (`progress`), so there's no snap when the deck advances.
 */
export function SwipeDeck<T>({
  data,
  renderCard,
  onSwipe,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  onEnd,
  swipeThreshold,
  stackSize = STACK_SIZE,
  disableTopSwipe,
  style,
  cardStyle,
}: SwipeDeckProps<T>) {
  const [index, setIndex] = useState(0);
  const progress = useSharedValue(0);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const item = data[index];
      if (item === undefined) return;

      onSwipe?.(item, index, direction);
      if (direction === 'left') onSwipeLeft?.(item, index);
      else if (direction === 'right') onSwipeRight?.(item, index);
      else if (direction === 'top') onSwipeTop?.(item, index);

      // Reset progress in the SAME tick the index advances: the card behind was
      // already raised to the front (progress≈1), and its depth drops by 1, so
      // `depth - progress` is continuous and nothing jumps.
      progress.value = 0;
      const next = index + 1;
      setIndex(next);
      if (next >= data.length) onEnd?.();
    },
    [data, index, onSwipe, onSwipeLeft, onSwipeRight, onSwipeTop, onEnd, progress],
  );

  const visible: number[] = [];
  for (let i = index; i < Math.min(index + stackSize, data.length); i++) {
    visible.push(i);
  }

  return (
    <View style={[styles.deck, style]}>
      {visible
        .map((dataIndex) => {
          const depth = dataIndex - index;
          const content = renderCard(data[dataIndex], dataIndex);

          if (depth === 0) {
            return (
              <SwipeCard
                key={dataIndex}
                onSwipe={handleSwipe}
                progress={progress}
                swipeThreshold={swipeThreshold}
                disableTopSwipe={disableTopSwipe}
                style={cardStyle}>
                {content}
              </SwipeCard>
            );
          }

          return (
            <BackgroundCard key={dataIndex} depth={depth} progress={progress} style={cardStyle}>
              {content}
            </BackgroundCard>
          );
        })
        // Paint back-to-front so the interactive top card sits above the stack.
        .reverse()}
    </View>
  );
}

interface BackgroundCardProps {
  depth: number;
  progress: SharedValue<number>;
  children: ReactNode;
  style?: FoontoStyle;
}

/**
 * A non-interactive card behind the top card. Its "effective depth" shrinks as
 * the top card is dragged away, raising it smoothly toward the front.
 */
function BackgroundCard({ depth, progress, children, style }: BackgroundCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const d = depth - progress.value;
    return {
      transform: [
        { scale: interpolate(d, [0, 1, 2, 3], [1, 0.92, 0.85, 0.85], Extrapolation.CLAMP) },
        { translateY: interpolate(d, [0, 1, 2, 3], [0, 18, 34, 34], Extrapolation.CLAMP) },
      ],
      opacity: interpolate(d, [0, 1, 2, 3], [1, 1, 1, 0], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View
      entering={FadeIn.duration(220)}
      style={[styles.card, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deck: { flex: 1 },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

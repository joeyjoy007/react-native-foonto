import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { FoontoStyle } from '../../types';
import { STACK_SIZE } from './constants';
import { SwipeCard } from './SwipeCard';
import type { SwipeDeckProps, SwipeDirection } from './types';

/**
 * A Tinder-style deck of swipeable cards. Only the top card is interactive;
 * cards behind it scale up and rise into place as the deck advances.
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

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const item = data[index];
      if (item === undefined) return;

      onSwipe?.(item, index, direction);
      if (direction === 'left') onSwipeLeft?.(item, index);
      else if (direction === 'right') onSwipeRight?.(item, index);
      else if (direction === 'top') onSwipeTop?.(item, index);

      const next = index + 1;
      setIndex(next);
      if (next >= data.length) onEnd?.();
    },
    [data, index, onSwipe, onSwipeLeft, onSwipeRight, onSwipeTop, onEnd],
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
                swipeThreshold={swipeThreshold}
                disableTopSwipe={disableTopSwipe}
                style={cardStyle}>
                {content}
              </SwipeCard>
            );
          }

          return (
            <BackgroundCard key={dataIndex} depth={depth} style={cardStyle}>
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
  children: ReactNode;
  style?: FoontoStyle;
}

/** A non-interactive card behind the top card, animating toward the front. */
function BackgroundCard({ depth, children, style }: BackgroundCardProps) {
  const progress = useSharedValue(depth);

  useEffect(() => {
    progress.value = withSpring(depth, { damping: 20, stiffness: 160 });
  }, [depth, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1, 2], [1, 0.94, 0.88], Extrapolation.CLAMP) },
      { translateY: interpolate(progress.value, [0, 1, 2], [0, 14, 28], Extrapolation.CLAMP) },
    ],
  }));

  return <Animated.View style={[styles.card, animatedStyle, style]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  deck: { flex: 1 },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

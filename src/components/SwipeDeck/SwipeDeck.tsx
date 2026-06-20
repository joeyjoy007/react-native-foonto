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
 * A Tinder-style deck of swipeable cards. Only the top card is interactive; the
 * cards behind it rise into place as the top card is dragged away.
 *
 * Every card is positioned by `dataIndex - swiped`, where `swiped` is a single
 * cumulative shared value. Because that value is continuous on the UI thread and
 * each card keys off its absolute index, advancing the deck never snaps or
 * flickers — React only mounts/unmounts the off-screen and faded-in cards.
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
  // Cumulative number of cards swiped (fractional while a drag is in progress).
  const swiped = useSharedValue(0);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const item = data[index];
      if (item === undefined) return;

      onSwipe?.(item, index, direction);
      if (direction === 'left') onSwipeLeft?.(item, index);
      else if (direction === 'right') onSwipeRight?.(item, index);
      else if (direction === 'top') onSwipeTop?.(item, index);

      // `swiped` has already animated to index + 1; just advance React state.
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
          const content = renderCard(data[dataIndex], dataIndex);

          if (dataIndex === index) {
            return (
              <SwipeCard
                key={dataIndex}
                onSwipe={handleSwipe}
                swiped={swiped}
                swipeThreshold={swipeThreshold}
                disableTopSwipe={disableTopSwipe}
                style={cardStyle}>
                {content}
              </SwipeCard>
            );
          }

          return (
            <BackgroundCard
              key={dataIndex}
              dataIndex={dataIndex}
              swiped={swiped}
              style={cardStyle}>
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
  dataIndex: number;
  swiped: SharedValue<number>;
  children: ReactNode;
  style?: FoontoStyle;
}

/**
 * A non-interactive card behind the top card. Its effective depth
 * (`dataIndex - swiped`) shrinks continuously as the deck advances.
 */
function BackgroundCard({ dataIndex, swiped, children, style }: BackgroundCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const d = dataIndex - swiped.value;
    return {
      transform: [
        { scale: interpolate(d, [0, 1, 2, 3], [1, 0.92, 0.85, 0.85], Extrapolation.CLAMP) },
        { translateY: interpolate(d, [0, 1, 2, 3], [0, 18, 34, 34], Extrapolation.CLAMP) },
      ],
      opacity: interpolate(d, [0, 1, 2, 3], [1, 1, 1, 0], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View entering={FadeIn.duration(220)} style={[styles.card, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deck: { flex: 1 },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

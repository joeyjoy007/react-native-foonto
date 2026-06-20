import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { type SharedValue } from 'react-native-reanimated';

import type { FoontoStyle } from '../../types';
import type { SwipeDirection } from './types';
import { useSwipeGesture } from './useSwipeGesture';

interface SwipeCardProps {
  children: ReactNode;
  onSwipe: (direction: SwipeDirection) => void;
  swiped: SharedValue<number>;
  swipeThreshold?: number;
  disableTopSwipe?: boolean;
  style?: FoontoStyle;
}

/** The interactive top card of the deck. Internal to SwipeDeck. */
export function SwipeCard({
  children,
  onSwipe,
  swiped,
  swipeThreshold,
  disableTopSwipe,
  style,
}: SwipeCardProps) {
  const { pan, cardStyle } = useSwipeGesture({
    onSwipe,
    swiped,
    swipeThreshold,
    disableTopSwipe,
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle, style]}>{children}</Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

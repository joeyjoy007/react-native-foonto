import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export type SwipeDirection = 'left' | 'right' | 'top';

export interface SwipeDeckProps<T> {
  /** Cards to render. The first item is the bottom of the stack. */
  data: T[];
  /** Render the visual content of a single card. */
  renderCard: (item: T, index: number) => ReactNode;
  /** Fired when any card is swiped off the deck. */
  onSwipe?: (item: T, index: number, direction: SwipeDirection) => void;
  onSwipeLeft?: (item: T, index: number) => void;
  onSwipeRight?: (item: T, index: number) => void;
  onSwipeTop?: (item: T, index: number) => void;
  /** Fired after the last card leaves the deck. */
  onEnd?: () => void;
  /** Fraction of screen width past which a release commits the swipe (0–1). */
  swipeThreshold?: number;
  /** Number of cards rendered behind the top card. */
  stackSize?: number;
  /** Disable the upward "super like" swipe. */
  disableTopSwipe?: boolean;
  style?: FoontoStyle;
  cardStyle?: FoontoStyle;
}

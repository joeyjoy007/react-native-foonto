import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { FoontoStyle } from '../../types';

export interface CarouselProps<T> {
  /** Items to render. */
  data: T[];
  /** Render one card's content (fills the card). */
  renderItem: (item: T, index: number) => ReactNode;
  /** Card width in px. Defaults to 70% of screen width. */
  itemWidth?: number;
  /** Card height in px. Defaults to 360. */
  itemHeight?: number;
  /** Gap between cards in px. Defaults to 16. */
  spacing?: number;
  /** Scale of the side (non-focused) cards. Defaults to 0.86. */
  sideScale?: number;
  /** Opacity of the side cards. Defaults to 0.6. */
  sideOpacity?: number;
  /** Fired with the centered card index after a snap. */
  onIndexChange?: (index: number) => void;
  style?: FoontoStyle;
}

export interface CarouselItemProps {
  index: number;
  scrollX: SharedValue<number>;
  page: number;
  itemWidth: number;
  itemHeight: number;
  spacing: number;
  sideScale: number;
  sideOpacity: number;
  children: ReactNode;
}

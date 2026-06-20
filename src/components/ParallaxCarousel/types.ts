import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { FoontoStyle } from '../../types';

export interface ParallaxCarouselProps<T> {
  /** Items to render, one full-width page each. */
  data: T[];
  /** Render the parallaxing background (e.g. an Image filling the page). */
  renderItem: (item: T, index: number) => ReactNode;
  /** Optional non-parallaxing overlay (e.g. a caption) on top of each page. */
  renderOverlay?: (item: T, index: number) => ReactNode;
  /** Page height in px. Defaults to 420. */
  height?: number;
  /** How far the background shifts relative to the page (0–1). Defaults to 0.3. */
  intensity?: number;
  /** Fired with the page index after a snap. */
  onIndexChange?: (index: number) => void;
  style?: FoontoStyle;
}

export interface ParallaxItemProps {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
  height: number;
  intensity: number;
  children: ReactNode;
  overlay?: ReactNode;
}

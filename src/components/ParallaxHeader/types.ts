import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface ParallaxHeaderProps {
  /** Height of the header area in px. Defaults to 280. */
  headerHeight?: number;
  /** Renders the header content (image, gradient, title, …). */
  renderHeader: () => ReactNode;
  /** Scrollable content below the header. */
  children: ReactNode;
  /** Style for the scroll view. */
  style?: FoontoStyle;
  /** Style for the content container below the header. */
  contentContainerStyle?: FoontoStyle;
}

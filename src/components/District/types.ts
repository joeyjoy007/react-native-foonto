import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface DistrictItem {
  /** Unique key for this category. */
  key: string;
  /** Text shown on the card and on the collapsed pill. */
  label: string;
  /** Optional card background color in grid mode. */
  color?: string;
  /**
   * Optional content rendered in the panel when this item is selected.
   * Defaults to the item's label.
   */
  renderContent?: () => ReactNode;
}

export interface DistrictProps {
  /** Categories to render as cards. */
  data: DistrictItem[];
  /** Number of grid columns before a card is selected. Defaults to 2. */
  columns?: number;
  /** Gap between cards / pills in px. Defaults to 12. */
  gap?: number;
  /** Card height in grid mode (px). Defaults to 110. */
  cardHeight?: number;
  /** Color of the active label in the bar. Defaults to '#6d28d9'. */
  activeColor?: string;
  /** Color of inactive labels in the bar. Defaults to '#9ca3af'. */
  inactiveColor?: string;
  /** Default card background in grid mode. Defaults to '#f4f4f5'. */
  cardColor?: string;
  /** Label / content text color. Defaults to '#18181b'. */
  textColor?: string;
  /** Fired when a category is selected (not when it collapses back). */
  onSelect?: (key: string) => void;
  style?: FoontoStyle;
}

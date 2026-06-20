import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface MasonryGridProps<T> {
  /** Items to lay out. */
  data: T[];
  /** Stable unique key for an item. */
  keyExtractor: (item: T) => string;
  /** Render one cell. Receives the resolved column width. */
  renderItem: (item: T, columnWidth: number) => ReactNode;
  /** Returns a cell's height for the given column width (drives the layout). */
  getHeight: (item: T, columnWidth: number) => number;
  /** Number of columns. Defaults to 2. */
  columns?: number;
  /** Gap between cells in px. Defaults to 12. */
  spacing?: number;
  /** Stagger (ms) between each cell's entrance. Defaults to 60. */
  stagger?: number;
  style?: FoontoStyle;
}

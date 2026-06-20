import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { FoontoStyle } from '../../types';

export interface DraggableListProps<T> {
  /** Items to render. */
  data: T[];
  /** Stable unique key for an item. */
  keyExtractor: (item: T) => string;
  /** Render one row's content (it fills the row height). */
  renderItem: (item: T) => ReactNode;
  /** Fixed row height in px. Defaults to 64. */
  itemHeight?: number;
  /** Long-press delay (ms) before a drag begins. Defaults to 200. */
  longPressDelay?: number;
  /** Fired with the reordered data after a drag settles. */
  onReorder?: (data: T[]) => void;
  style?: FoontoStyle;
}

/** id → slot index map, shared across rows on the UI thread. */
export type Positions = Record<string, number>;

export interface DraggableItemProps {
  id: string;
  /** Initial slot index — used for the first layout (avoids reading shared values in render). */
  initialIndex: number;
  positions: SharedValue<Positions>;
  count: number;
  itemHeight: number;
  longPressDelay: number;
  onReorder: (positions: Positions) => void;
  children: ReactNode;
}

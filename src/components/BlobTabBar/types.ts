import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { FoontoStyle } from '../../types';

export interface BlobTab {
  /** Unique key for this tab. */
  key: string;
  /** Optional text label under the icon. Omit for icon-only (Instagram style). */
  label?: string;
  /**
   * Renders the icon. Receives `active` so you can swap color/weight.
   * Optional — omit for label-only tabs.
   */
  icon?: (active: boolean) => ReactNode;
}

export interface BlobTabBarProps {
  /** Tabs to render, left to right. */
  tabs: BlobTab[];
  /** Key of the active tab (controlled). */
  activeKey: string;
  /** Called with the key of the tapped tab. */
  onChange: (key: string) => void;
  /**
   * Optional fractional tab index (e.g. from a pager's scroll position) that
   * the highlight pill follows continuously. When omitted, the pill eases to
   * the active tab with timing.
   */
  indicatorIndex?: SharedValue<number>;
  /** Active icon/label color. Defaults to '#111111'. */
  color?: string;
  /** Inactive icon/label color. Defaults to '#9ca3af'. */
  inactiveColor?: string;
  /** Color of the highlight pill behind the active tab. Defaults to a soft gray. */
  pillColor?: string;
  /** Width of the highlight pill as a fraction of a tab (0–1). Defaults to 0.82. */
  pillWidthRatio?: number;
  /** Corner radius of the highlight pill. Defaults to 999 (capsule). */
  pillRadius?: number;
  /** Bar background. Defaults to a translucent white ('rgba(255,255,255,0.8)'). */
  background?: string;
  /** Bar height in px. Defaults to 60. */
  height?: number;
  style?: FoontoStyle;
}

import type { FoontoStyle } from '../../types';

export interface SkeletonProps {
  /** Width in px or a percent string. Defaults to '100%'. */
  width?: number | `${number}%`;
  /** Height in px. Defaults to 16. */
  height?: number;
  /** Corner radius. Ignored when `circle` is true. */
  radius?: number;
  /** Render as a circle (avatar). Uses `height` as the diameter. */
  circle?: boolean;
  /** Two-stop shimmer gradient colors: [base, highlight]. */
  colors?: [string, string];
  /** Shimmer sweep duration in ms. */
  duration?: number;
  style?: FoontoStyle;
}

import type { FoontoStyle } from '../../types';

/** Shimmer animation styles. */
export type SkeletonAnimation = 'shimmer' | 'wave' | 'pulse' | 'none';

export interface SkeletonProps {
  /** Width in px or a percent string. Defaults to '100%'. */
  width?: number | `${number}%`;
  /** Height in px. Defaults to 16. */
  height?: number;
  /** Corner radius. Ignored when `circle` is true. */
  radius?: number;
  /** Render as a circle (avatar). Uses `height` as the diameter. */
  circle?: boolean;
  /** Two-stop colors: [base, highlight]. */
  colors?: [string, string];
  /** Animation cycle duration in ms. */
  duration?: number;
  /** Which shimmer style to use. Defaults to 'shimmer'. */
  animation?: SkeletonAnimation;
  style?: FoontoStyle;
}

type SharedSkeletonProps = Pick<SkeletonProps, 'animation' | 'colors' | 'duration' | 'style'>;

export interface SkeletonTextProps extends SharedSkeletonProps {
  /** Number of lines. Defaults to 3. */
  lines?: number;
  /** Height of each line. Defaults to 12. */
  lineHeight?: number;
  /** Vertical gap between lines. Defaults to 10. */
  spacing?: number;
  /** Width of the final (short) line. Defaults to '60%'. */
  lastLineWidth?: number | `${number}%`;
}

export interface SkeletonCardProps extends SharedSkeletonProps {
  /** Height of the media block at the top of the card. Defaults to 160. */
  mediaHeight?: number;
}

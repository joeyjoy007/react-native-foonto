import { LinearTransition } from 'react-native-reanimated';

export const DEFAULT_COLUMNS = 2;
export const DEFAULT_GAP = 12;
export const DEFAULT_CARD_HEIGHT = 110;
export const DEFAULT_ACTIVE_COLOR = '#6d28d9';
export const DEFAULT_INACTIVE_COLOR = '#9ca3af';
export const DEFAULT_CARD_COLOR = '#f4f4f5';
export const DEFAULT_TEXT_COLOR = '#18181b';

/**
 * Shared spring layout transition for the grid ⇄ text-bar morph.
 * Tuned slow + smooth — low stiffness, no bounce.
 */
export const TRANSITION = LinearTransition.springify()
  .damping(20)
  .stiffness(85)
  .mass(1.1);

import type { ReactNode } from 'react';
import type { SharedTransition } from 'react-native-reanimated';
import type { FoontoStyle } from '../../types';

export interface SharedElementProps {
  /** Stable id matched across screens. Must be identical on both screens. */
  id: string;
  children?: ReactNode;
  style?: FoontoStyle;
  /**
   * Optional custom transition (e.g. one of `sharedTransitions`). Set the same
   * one on both screens. Omit for Reanimated's built-in default.
   */
  transition?: SharedTransition;
}

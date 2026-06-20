import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface SharedElementProps {
  /** Stable id matched across screens to animate between. */
  id: string;
  children: ReactNode;
  style?: FoontoStyle;
}

export interface SharedTransitionProviderProps {
  children: ReactNode;
}

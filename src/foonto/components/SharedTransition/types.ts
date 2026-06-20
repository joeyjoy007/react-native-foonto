import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface SharedElementProps {
  /** Stable id matched across screens. Must be identical on both screens. */
  id: string;
  children?: ReactNode;
  style?: FoontoStyle;
}

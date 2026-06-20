import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface StackCardsProps<T> {
  /** Items to stack. */
  data: T[];
  /** Render one card's content. */
  renderCard: (item: T, index: number) => ReactNode;
  /** How many cards are visible in the stack. Defaults to 3. */
  visibleCount?: number;
  /** Vertical offset (px) between stacked cards. Defaults to 18. */
  offset?: number;
  /** Scale reduction per card deeper in the stack. Defaults to 0.06. */
  scaleStep?: number;
  /** Fixed card height in px. Defaults to 200. */
  cardHeight?: number;
  /** Fired when the front card changes, with the new front item index. */
  onCycle?: (frontIndex: number) => void;
  style?: FoontoStyle;
}

export interface StackCardItemProps {
  /** Position in the stack: 0 = front. */
  pos: number;
  /** Total number of cards. */
  total: number;
  visibleCount: number;
  offset: number;
  scaleStep: number;
  cardHeight: number;
  /** Called once the front card has flown off and should move to the back. */
  onSendToBack: () => void;
  children: ReactNode;
}

import type { FoontoStyle } from '../../types';

export interface OtpInputProps {
  /** Number of digit cells. Defaults to 4. */
  length?: number;
  /** Controlled value (digits only). */
  value: string;
  /** Called with the new value on every edit. */
  onChange: (value: string) => void;
  /** Called once the final digit is entered. */
  onComplete?: (value: string) => void;
  /** Focus the field on mount. */
  autoFocus?: boolean;
  /** Mask digits with dots. */
  secure?: boolean;
  /** Edge length of each cell in px. Defaults to 56. */
  cellSize?: number;
  /** Gap between cells in px. Defaults to 12. */
  cellGap?: number;
  /** Highlight color for the active/filled cell. Defaults to '#6d28d9'. */
  focusColor?: string;
  style?: FoontoStyle;
}

export interface OtpCellProps {
  char: string;
  filled: boolean;
  active: boolean;
  size: number;
  focusColor: string;
  secure: boolean;
}

import type { FoontoStyle } from '../../types';

export interface AnimatedCheckboxProps {
  /** Whether the box is checked. */
  checked: boolean;
  /** Called when the box is pressed, with the next checked value. */
  onChange?: (checked: boolean) => void;
  /** Edge length of the box in px. Defaults to 28. */
  size?: number;
  /** Fill + border color when checked. Defaults to '#6d28d9'. */
  color?: string;
  /** Border color when unchecked. Defaults to '#c4c4cc'. */
  borderColor?: string;
  /** Color of the checkmark. Defaults to '#ffffff'. */
  checkColor?: string;
  /** Animation duration in ms. Defaults to 180. */
  duration?: number;
  /** Disable interaction and dim the box. */
  disabled?: boolean;
  style?: FoontoStyle;
}

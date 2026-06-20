import type { ReactNode } from 'react';
import type { FoontoStyle } from '../../types';

export interface SearchBarProps {
  /** Controlled query text. */
  value: string;
  /** Called as the query changes. */
  onChangeText: (text: string) => void;
  /** Placeholder shown when expanded. */
  placeholder?: string;
  /** Called when the user submits the query. */
  onSubmit?: (text: string) => void;
  /** Diameter of the collapsed icon button in px. Defaults to 48. */
  collapsedSize?: number;
  /** Expand/collapse duration in ms. Defaults to 280. */
  duration?: number;
  /** Accent color for the icon + caret. Defaults to '#6d28d9'. */
  tint?: string;
  /** Background of the bar. Defaults to '#f4f4f5'. */
  background?: string;
  /** Input text color. Defaults to '#18181b'. */
  textColor?: string;
  /** Placeholder text color. Defaults to '#a1a1aa'. */
  placeholderColor?: string;
  /** Clear the query when collapsing. Defaults to true. */
  clearOnCollapse?: boolean;
  /** Custom leading/search icon. Receives the active tint. Defaults to a built-in magnifier. */
  renderIcon?: (color: string) => ReactNode;
  /** Custom clear icon. Defaults to a built-in ✕. */
  renderClearIcon?: () => ReactNode;
  style?: FoontoStyle;
}

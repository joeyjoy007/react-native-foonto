import { View } from 'react-native';
import type { SharedElementProps } from './types';

/**
 * Marks a node as a shared element matched across screens by `id`.
 * TODO(impl): register with the provider and drive the transition.
 */
export function SharedElement({ children, style }: SharedElementProps) {
  return <View style={style}>{children}</View>;
}

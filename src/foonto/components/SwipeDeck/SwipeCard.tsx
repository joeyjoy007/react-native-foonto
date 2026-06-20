import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { FoontoStyle } from '../../types';

export interface SwipeCardProps {
  children: ReactNode;
  style?: FoontoStyle;
}

/**
 * A single draggable card.
 * TODO(impl): wire the gesture + Reanimated transform via useSwipeGesture.
 */
export function SwipeCard({ children, style }: SwipeCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

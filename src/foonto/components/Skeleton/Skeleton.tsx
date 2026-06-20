import { StyleSheet, View } from 'react-native';
import type { SkeletonProps } from './types';

/**
 * A shimmering placeholder block.
 * TODO(impl): animated highlight sweep via useShimmer.
 */
export function Skeleton({ width = '100%', height = 16, radius = 8, circle, style }: SkeletonProps) {
  const shape = circle
    ? { width: height, height, borderRadius: height / 2 }
    : { width, height, borderRadius: radius };

  return <View style={[styles.base, shape, style]} />;
}

const styles = StyleSheet.create({
  base: { backgroundColor: '#E1E9EE', overflow: 'hidden' },
});

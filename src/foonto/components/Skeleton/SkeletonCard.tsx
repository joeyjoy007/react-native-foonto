import { StyleSheet, View } from 'react-native';

import { Skeleton } from './Skeleton';
import type { SkeletonCardProps } from './types';

/** A media-card placeholder: image block + avatar row with two text lines. */
export function SkeletonCard({
  mediaHeight = 160,
  animation,
  colors,
  duration,
  style,
}: SkeletonCardProps) {
  const shared = { animation, colors, duration };

  return (
    <View style={[styles.card, style]}>
      <Skeleton height={mediaHeight} radius={16} {...shared} />
      <View style={styles.row}>
        <Skeleton circle height={44} {...shared} />
        <View style={styles.lines}>
          <Skeleton height={12} width="70%" {...shared} />
          <Skeleton height={12} width="40%" {...shared} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  lines: { flex: 1, gap: 8 },
});

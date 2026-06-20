import { View } from 'react-native';

import { Skeleton } from './Skeleton';
import type { SkeletonTextProps } from './types';

/** A paragraph placeholder — N lines with a shorter final line. */
export function SkeletonText({
  lines = 3,
  lineHeight = 12,
  spacing = 10,
  lastLineWidth = '60%',
  animation,
  colors,
  duration,
  style,
}: SkeletonTextProps) {
  return (
    <View style={[{ gap: spacing }, style]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={lineHeight}
          radius={lineHeight / 2}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          animation={animation}
          colors={colors}
          duration={duration}
        />
      ))}
    </View>
  );
}

import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import type { MasonryGridProps } from './types';

/**
 * A balanced multi-column masonry layout. Items flow into the shortest column
 * (using `getHeight`) and reveal with a staggered fade-up entrance.
 */
export function MasonryGrid<T>({
  data,
  keyExtractor,
  renderItem,
  getHeight,
  columns = 2,
  spacing = 12,
  stagger = 60,
  style,
}: MasonryGridProps<T>) {
  const [width, setWidth] = useState(0);
  const columnWidth = width > 0 ? (width - spacing * (columns - 1)) / columns : 0;

  function onLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width);
  }

  // Greedy shortest-column distribution.
  const buckets: { item: T; order: number }[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);
  data.forEach((item, order) => {
    let shortest = 0;
    for (let c = 1; c < columns; c++) {
      if (heights[c] < heights[shortest]) shortest = c;
    }
    buckets[shortest].push({ item, order });
    heights[shortest] += getHeight(item, columnWidth) + spacing;
  });

  return (
    <View onLayout={onLayout} style={[styles.row, { gap: spacing }, style]}>
      {columnWidth > 0 &&
        buckets.map((bucket, ci) => (
          <View key={ci} style={[styles.column, { gap: spacing }]}>
            {bucket.map(({ item, order }) => (
              <Animated.View
                key={keyExtractor(item)}
                entering={FadeInDown.delay(order * stagger).duration(420)}
                style={{ height: getHeight(item, columnWidth) }}
              >
                {renderItem(item, columnWidth)}
              </Animated.View>
            ))}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  column: { flex: 1 },
});

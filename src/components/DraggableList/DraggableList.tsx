import { useCallback } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { DraggableItem } from './DraggableItem';
import type { DraggableListProps, Positions } from './types';

/**
 * A vertical list whose rows can be long-pressed and dragged to reorder. Rows
 * are absolutely positioned by a shared id→index map, so reordering stays
 * continuous and never snaps. Call `onReorder` to persist the new order.
 */
export function DraggableList<T>({
  data,
  keyExtractor,
  renderItem,
  itemHeight = 64,
  longPressDelay = 200,
  onReorder,
  style,
}: DraggableListProps<T>) {
  const positions = useSharedValue<Positions>(
    Object.fromEntries(data.map((item, index) => [keyExtractor(item), index])),
  );

  const handleReorder = useCallback(
    (next: Positions) => {
      const ordered = data
        .slice()
        .sort((a, b) => next[keyExtractor(a)] - next[keyExtractor(b)]);
      onReorder?.(ordered);
    },
    [data, keyExtractor, onReorder],
  );

  return (
    <View style={[{ height: data.length * itemHeight }, style]}>
      {data.map((item, index) => (
        <DraggableItem
          key={keyExtractor(item)}
          id={keyExtractor(item)}
          initialIndex={index}
          positions={positions}
          count={data.length}
          itemHeight={itemHeight}
          longPressDelay={longPressDelay}
          onReorder={handleReorder}
        >
          {renderItem(item)}
        </DraggableItem>
      ))}
    </View>
  );
}

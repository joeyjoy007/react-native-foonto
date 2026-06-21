import { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

/**
 * Holds the selection + measured width for District. Tapping a card selects it;
 * tapping the already-selected card collapses back to the grid.
 */
export function useDistrict(onSelect?: (key: string) => void) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [width, setWidth] = useState(0);

  const onContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  }, []);

  const select = useCallback(
    (key: string) => {
      setSelectedKey((prev) => {
        const next = prev === key ? null : key;
        if (next) onSelect?.(next);
        return next;
      });
    },
    [onSelect]
  );

  return { selectedKey, width, onContainerLayout, select };
}

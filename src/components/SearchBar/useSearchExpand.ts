import { useCallback, useState } from 'react';
import { useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';

/**
 * Owns the expand/collapse state. `progress` (0→1) drives the width + fade on
 * the UI thread; `open` mirrors it on the JS side for focus/blur side effects.
 */
export function useSearchExpand(duration: number): {
  progress: SharedValue<number>;
  open: boolean;
  expand: () => void;
  collapse: () => void;
} {
  const progress = useSharedValue(0);
  const [open, setOpen] = useState(false);

  const expand = useCallback(() => {
    setOpen(true);
    progress.value = withTiming(1, { duration });
  }, [duration, progress]);

  const collapse = useCallback(() => {
    setOpen(false);
    progress.value = withTiming(0, { duration });
  }, [duration, progress]);

  return { progress, open, expand, collapse };
}

import { useEffect } from 'react';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

/**
 * A looping 0 → 1 progress value driving the shimmer sweep.
 * Runs entirely on the UI thread.
 */
export function useShimmer(duration: number) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [duration, progress]);

  return progress;
}

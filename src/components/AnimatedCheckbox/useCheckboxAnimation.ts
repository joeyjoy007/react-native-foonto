import { useEffect } from 'react';
import {
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

/**
 * Drives a single 0→1 progress value off the `checked` prop. The component
 * reads `progress` inside `useAnimatedStyle` to interpolate fill, border, and
 * the checkmark — all on the UI thread.
 */
export function useCheckboxAnimation(
  checked: boolean,
  duration: number,
): SharedValue<number> {
  const progress = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration });
  }, [checked, duration, progress]);

  return progress;
}

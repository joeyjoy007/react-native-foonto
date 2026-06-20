/**
 * Clamp a value between min and max.
 * Marked as a worklet so it can be called directly inside Reanimated worklets.
 */
export function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

import type { Positions } from './types';

/** Swap the two ids occupying slots `from` and `to`. Worklet-safe. */
export function objectMove(positions: Positions, from: number, to: number): Positions {
  'worklet';
  const next: Positions = { ...positions };
  for (const id in positions) {
    if (positions[id] === from) next[id] = to;
    if (positions[id] === to) next[id] = from;
  }
  return next;
}

import type { SharedTransitionPreset } from 'react-native-foonto';

type Tile = { id: string; color: string; transition: SharedTransitionPreset };

/** Demo data for the shared element transition gallery — one preset per tile. */
export const TILES: readonly Tile[] = [
  { id: '1', color: '#FF5864', transition: 'gentle' },
  { id: '2', color: '#208AEF', transition: 'snappy' },
  { id: '3', color: '#34C759', transition: 'lazy' },
  { id: '4', color: '#FF9F0A', transition: 'bouncy' },
  { id: '5', color: '#AF52DE', transition: 'gentle' },
  { id: '6', color: '#5AC8FA', transition: 'bouncy' },
];

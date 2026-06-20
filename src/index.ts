/**
 * react-native-foonto (rn-foonto)
 * High-quality, open-source React Native animations.
 *
 * This file is the PUBLIC API barrel — the future npm entry point.
 * Everything a consumer can import must be re-exported from here.
 *
 * The showcase app imports from `react-native-foonto` (aliased to this folder
 * in tsconfig + Metro) so that extracting this directory into a standalone
 * published package requires ZERO import changes anywhere.
 *
 * Rule for this folder: depend only on peer deps
 * (react, react-native, react-native-reanimated, react-native-gesture-handler).
 * Never import from the app via `@/...`.
 */

// 1. Tinder-style swipe card deck
export * from './components/SwipeDeck';

// 2. Skeleton shimmer placeholders
export * from './components/Skeleton';

// 3. Shared element transitions
export * from './components/SharedTransition';

// Shared public types
export * from './types';

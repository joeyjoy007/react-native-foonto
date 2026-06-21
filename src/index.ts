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

// 4. Parallax + pull-to-zoom scroll header
export * from './components/ParallaxHeader';

// 5. Animated checkbox
export * from './components/AnimatedCheckbox';

// 6. Segmented OTP / PIN input with bounce
export * from './components/OtpInput';

// 7. Expanding search bar
export * from './components/SearchBar';

// 8. Toast notifications
export * from './components/Toast';

// 9. Tap-to-cycle card stack
export * from './components/StackCards';

// 10. Bottom tab bar with sliding blob
export * from './components/BlobTabBar';

// 11. Drag-to-reorder list
export * from './components/DraggableList';

// 12. Center-focused snapping carousel
export * from './components/Carousel';

// 13. Full-width parallax image carousel
export * from './components/ParallaxCarousel';

// 14. Staggered masonry grid
export * from './components/MasonryGrid';

// 15. Category grid that collapses into a bar
export * from './components/District';

// Shared public types
export * from './types';

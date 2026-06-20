# rn-foonto — Architecture & Code Standards

> The single source of truth for how this repo is structured and how code is written.
> **Read and follow this on every change.** It is loaded automatically via `AGENTS.md`.

`react-native-foonto` (rn-foonto) is an open-source React Native **animation library**,
packaged with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob).
The publishable library lives at the repo root (`src/`); a Expo SDK 56 showcase app lives in
`example/` (an npm workspace) and consumes the library exactly like an end user.

---

## 1. Project shape (builder-bob + example workspace)

```
react-native-foonto/                  ← THE LIBRARY (published to npm)
├── src/                              library source (published)
│   ├── index.ts                      public API barrel = the npm entry point
│   ├── types.ts                      shared public types (FoontoStyle, …)
│   ├── utils/                        worklet-safe helpers (clamp, …)
│   └── components/
│       ├── SwipeDeck/                Tinder-style swipe deck
│       ├── Skeleton/                 shimmer placeholders
│       └── SharedTransition/         shared element transitions
├── lib/                              bob build output (gitignored, shipped to npm)
├── package.json                      builder-bob config, peerDeps, workspaces:[example]
├── tsconfig.json                     editor/typecheck config
├── tsconfig.build.json               declaration emit for the typescript target
├── ARCHITECTURE.md                   (this file)
├── AGENTS.md                         project instructions (loads this file)
└── example/                          ← THE SHOWCASE APP (workspace, NOT published)
    ├── src/app/                      expo-router screens — one per animation
    │   ├── _layout.tsx               Stack + GestureHandlerRootView
    │   ├── index.tsx                 gallery home
    │   └── <demo>.tsx
    ├── src/{components,constants,hooks}
    ├── app.json
    ├── metro.config.js               resolves react-native-foonto → ../src, dedupes peers
    ├── babel.config.js               babel-preset-expo
    ├── tsconfig.json                 paths: react-native-foonto → ../src
    └── package.json
```

- Build the library: `npm run build` (bob) — outputs CJS + ESM + types to `lib/`.
- Run the showcase: `npm run example:start` / `:ios` / `:android` (or `cd example && npx expo …`).
- `npm install` at the root sets up the workspace and runs `prepare` (bob build).

### The golden rule

**`src/` (the library) must depend ONLY on peer dependencies** — `react`, `react-native`,
`react-native-reanimated`, `react-native-gesture-handler`, `expo-linear-gradient`.

- ❌ Never import example/app code into `src/`. No app theme, constants, or screens.
- ❌ Anything app-specific belongs in `example/src/`, never in `src/`.
- ✅ The example imports the library by its real npm name: `from 'react-native-foonto'`
  (resolved to `../src` via `example/metro.config.js` + tsconfig paths) — exactly like an
  end user, so the published package is always exercised the same way it ships.

Peer deps are hoisted to the root `node_modules` by the workspace, so there is a single
instance of react / reanimated / gesture-handler across the library and the example.

---

## 2. Component folder anatomy

Every animation is a self-contained folder under `src/components/`:

```
ComponentName/
├── ComponentName.tsx     the public component (presentation + composition)
├── useComponentName.ts   the animation/gesture hook (reanimated logic)
├── SubParts.tsx          internal-only pieces (not exported)
├── constants.ts          tunable defaults (durations, thresholds)
├── types.ts              public prop types + exported unions
└── index.ts              barrel — exports ONLY the public surface
```

- Keep **presentation** (`.tsx`) separate from **animation logic** (`use*.ts`).
- Internal helpers are **not** exported from the folder `index.ts`.
- `types.ts` holds the public props interface and any exported enums/unions.

---

## 3. Naming & exports

- **Components**: PascalCase files and names — `SwipeDeck.tsx` → `SwipeDeck`.
- **Hooks**: camelCase `use*` — `useSwipeGesture.ts`.
- **Types**: PascalCase, suffix props with `Props` — `SwipeDeckProps`.
- **Barrels**: every component folder has `index.ts`; the root `src/foonto/index.ts`
  re-exports every public component, preset, and type. Consumers import only from the
  package root.
- Export types with `export type { … }` (isolatedModules-safe).

---

## 4. Animation conventions (Reanimated 4 + Gesture Handler 2)

This project is on **Expo SDK 56 / Reanimated ^4.3 / Gesture Handler ~2.31 / RN 0.85**
(new architecture / Fabric). Always confirm APIs against the versioned docs
(https://docs.expo.dev/versions/v56.0.0/) — Reanimated 4 differs from older tutorials.

- **Babel**: `babel-preset-expo` auto-configures the worklets plugin. **Do not** add a
  `babel.config.js` for reanimated.
- **Gestures**: `Gesture.Pan()/.Tap()/…` + `<GestureDetector>`. The app root must wrap
  everything in `<GestureHandlerRootView style={{ flex: 1 }}>`.
- **Run animation work on the UI thread.** Drive motion from `useSharedValue` +
  `useAnimatedStyle`. Keep React state and the JS thread out of the per-frame path.
- **`runOnJS` only at boundaries** — e.g. inside a `withTiming` completion callback to
  notify the component a swipe committed. Never per-frame.
- **Avoid cross-thread resets that flicker.** A shared value that React state also feeds
  can desync because the UI-thread write and the React re-render land on different frames.
  Prefer a **continuous, cumulative** value keyed off **stable identity**.
  > Lesson (SwipeDeck): cards are placed by `dataIndex - swiped`, where `swiped` is a
  > single cumulative shared value that never resets. This stays continuous across the
  > commit, so advancing the deck never snaps or flickers.
- **`worklet`** directive on any plain helper called inside a worklet (see `utils/clamp.ts`).
- **Interpolation**: use `interpolate(..., Extrapolation.CLAMP)` for bounded ranges.

### Platform caveats to remember

- **Shared element transitions** require the `ENABLE_SHARED_ELEMENT_TRANSITIONS`
  reanimated static feature flag (in `package.json` → `reanimated.staticFeatureFlags`),
  a **native stack** navigator, and a **native build** (not Expo Go). **Not supported on web.**
- **Gradients** use `expo-linear-gradient` (the Expo-native module).

---

## 5. Adding a new animation — checklist

1. Create `src/components/<Name>/` with the anatomy in §2.
2. Define the public props in `types.ts`. Keep the API small and declarative.
3. Put reanimated/gesture logic in a `use<Name>.ts` hook.
4. Export the public surface from the folder `index.ts`.
5. Re-export it from `src/index.ts` (the root barrel).
6. Add a demo screen in `example/src/app/<name>.tsx` and a card on the gallery home.
7. **Docs requirement (every component must ship both):**
   - a **"How to use"** snippet — minimal, copy-pasteable code.
   - an **AI prompt** — a clear, numbered, step-by-step prompt that recreates/integrates
     the animation. (These feed the docs website's two sections.)
8. `npm run typecheck` (library) and the example typecheck must pass; `npm run build`
   must succeed; verify the motion on a native build.

---

## 6. Quality gates (must pass before "done")

- ✅ Library typecheck: `npm run typecheck` clean.
- ✅ Library builds: `npm run build` (bob) emits CJS + ESM + types with no errors.
- ✅ Example typecheck clean (run `npx tsc --noEmit` in `example/`; pre-existing NativeWind
  `*.css` typedef warnings are the only allowed noise) and the example metro-bundles.
- ✅ No `any` in `src/` — type props and shared values explicitly (`SharedValue<number>`, etc.).
- ✅ Golden rule holds: no example/app imports inside `src/`.
- ✅ New/changed motion verified on a native build (iOS/Android), not just web.

---

## 7. Commit & PR hygiene

- Small, focused commits. Library changes and app/demo changes can share a commit when
  they ship one feature, but keep unrelated refactors separate.
- Branch off `main`; never commit secrets.

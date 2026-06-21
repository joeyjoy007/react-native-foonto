<div align="center">

# react-native-foonto

### Beautiful, production-grade React Native animations — copy the code, or paste the AI prompt and ship.

Polished, customizable components built on **Reanimated 4** & **Gesture Handler 2**.
Every animation runs on the UI thread, ships with TypeScript types, and works on **iOS** & **Android**.

[**🌐 Website & live demos →  foonto.com**](https://foonto.com) &nbsp;·&nbsp; [**📚 Docs**](https://foonto.com/docs) &nbsp;·&nbsp; [**📦 npm**](https://www.npmjs.com/package/react-native-foonto)

[![npm version](https://img.shields.io/npm/v/react-native-foonto?color=6d28d9&label=npm)](https://www.npmjs.com/package/react-native-foonto)
[![npm downloads](https://img.shields.io/npm/dm/react-native-foonto?color=6d28d9)](https://www.npmjs.com/package/react-native-foonto)
[![license](https://img.shields.io/npm/l/react-native-foonto?color=6d28d9)](./LICENSE)
![platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android-6d28d9)

</div>

---

## Why foonto

- **🎬 Real motion, the right way.** Gesture- and scroll-driven animations that run on the UI thread — no per-frame work on the JS thread, no jank.
- **📋 Copy-paste or prompt-to-ship.** Every component ships a minimal *How to use* snippet **and** a numbered AI prompt you can hand to Claude/Cursor to integrate it for you.
- **🎛️ Customizable by default.** Sensible defaults, fully typed props — colors, sizes, timings, and custom renderers where it matters.
- **🧩 Tree-shakeable & typed.** Import only what you use. First-class TypeScript types throughout. No `any`.
- **🆓 Open source, MIT.** Free forever. Use it in anything.

## Installation

```bash
npm install react-native-foonto react-native-reanimated react-native-gesture-handler expo-linear-gradient
```

Using Expo:

```bash
npx expo install react-native-foonto react-native-reanimated react-native-gesture-handler expo-linear-gradient
```

> **Peer dependencies:** `react-native-reanimated` (v4+), `react-native-gesture-handler` (v2+), and `expo-linear-gradient`.
> Built and tested on **Expo SDK 56 · React Native 0.85 · Reanimated 4 · Gesture Handler 2** (new architecture / Fabric).

Wrap your app root once so gestures work everywhere:

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ...your navigator / screens... */}
    </GestureHandlerRootView>
  );
}
```

## Quick start

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwipeDeck } from "react-native-foonto";
import { View, Text } from "react-native";

const PROFILES = [
  { id: "1", name: "Ada Lovelace", role: "Mathematician" },
  { id: "2", name: "Linus Torvalds", role: "Engineer" },
  { id: "3", name: "Grace Hopper", role: "Computer Scientist" },
];

export default function Discover() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SwipeDeck
        data={PROFILES}
        stackSize={3}
        renderCard={(item) => (
          <View style={{ flex: 1, borderRadius: 24, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ color: "#666", marginTop: 6 }}>{item.role}</Text>
          </View>
        )}
        onSwipeRight={(item) => console.log("liked", item.name)}
        onSwipeLeft={(item) => console.log("passed", item.name)}
      />
    </GestureHandlerRootView>
  );
}
```

Full props, *How to use* snippets, and copy-paste AI prompts for every component live at **[foonto.com/docs](https://foonto.com/docs)**.

## Components

| Component | What it does | Docs |
| --- | --- | --- |
| **SwipeDeck** | Tinder-style card deck — fling left, right, or up | [→](https://foonto.com/docs/swipe-deck) |
| **Shared Transition** | Morph an element smoothly between screens | [→](https://foonto.com/docs/shared-transition) |
| **Stack Cards** | Wallet-style stack — swipe up or tap to cycle | [→](https://foonto.com/docs/stack-cards) |
| **Blob Tab Bar** | Bottom tab bar with a sliding highlight pill | [→](https://foonto.com/docs/blob-tab-bar) |
| **Carousel** | Center-focused, snapping carousel | [→](https://foonto.com/docs/carousel) |
| **Draggable List** | Long-press to reorder rows | [→](https://foonto.com/docs/draggable-list) |
| **Parallax Carousel** | Full-width pager with a parallaxing background | [→](https://foonto.com/docs/parallax-carousel) |
| **Masonry Grid** | Balanced multi-column grid with a staggered reveal | [→](https://foonto.com/docs/masonry-grid) |
| **Skeleton** | Shimmer placeholders for loading states | [→](https://foonto.com/docs/skeleton) |
| **Animated Checkbox** | Fills and pops a checkmark when toggled | [→](https://foonto.com/docs/animated-checkbox) |
| **Parallax Header** | Scroll view with a parallax, pull-to-zoom header | [→](https://foonto.com/docs/parallax-header) |
| **OTP Input** | Segmented PIN field where each digit bounces in | [→](https://foonto.com/docs/otp-input) |
| **Search Bar** | Grows from an icon button to a full-width field | [→](https://foonto.com/docs/search-bar) |
| **Toast** | Stacking, auto-dismissing notifications | [→](https://foonto.com/docs/toast) |

> 💡 **Watch every animation in motion at [foonto.com](https://foonto.com)** — with code and AI prompts on each page.

## Previews

<table>
  <tr>
    <td width="50%" align="center">
      <b>Shared Transition</b><br/>
      <video src="https://github.com/user-attachments/assets/bed572d9-aa99-4dcd-9664-02d147bb89cc" autoplay loop muted playsinline width="100%"></video>
    </td>
    <td width="50%" align="center">
      <b>Stack Cards</b><br/>
      <video src="https://github.com/user-attachments/assets/4cb7c6dd-4129-4c0d-b41e-468ff5df483e" autoplay loop muted playsinline width="100%"></video>
    </td>
  </tr>
</table>

> Videos not playing here? [**See every animation on foonto.com →**](https://foonto.com)

## Shared element transitions — extra setup

`SharedTransition` needs the Reanimated static feature flag, a **native stack** navigator, and a **native build** (not Expo Go, not web). In your `package.json`:

```json
{
  "reanimated": {
    "staticFeatureFlags": {
      "ENABLE_SHARED_ELEMENT_TRANSITIONS": true
    }
  }
}
```

## TypeScript

Written in TypeScript — types ship with the package, no `@types` needed. Public prop types are exported alongside each component (e.g. `SwipeDeckProps`, `BlobTab`, `FoontoStyle`).

## Links

- 🌐 **Website & live demos** — [foonto.com](https://foonto.com)
- 📚 **Docs** (props · How to use · AI prompts) — [foonto.com/docs](https://foonto.com/docs)
- 📦 **npm** — [npmjs.com/package/react-native-foonto](https://www.npmjs.com/package/react-native-foonto)
- 💻 **GitHub** — [github.com/joeyjoy007/react-native-foonto](https://github.com/joeyjoy007/react-native-foonto)

## Contributing

Issues and PRs are welcome. The library lives in `src/`; the showcase app lives in `example/`. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the project structure and code standards.

## License

[MIT](./LICENSE) © foonto

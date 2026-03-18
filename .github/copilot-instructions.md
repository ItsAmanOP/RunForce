---
description: Guidelines, persona, and full project architecture for the RunForce Tracker app.
applyTo: "**"
---

# Persona

You are a Principal Senior Expert React Native Software Engineer working on the **RunForce Tracker** app — a real-time speed and distance tracker for competitive runners, police exam aspirants, marathon runners, and athletes.

# Core Principles

1. **Performance First**: Always consider React Native performance implications (JS thread vs UI thread, Hermes optimization, avoiding unnecessary re-renders).
2. **Modern Practices**: Use functional components (Arrow Functions), hooks, and strict TypeScript.
3. **Architecture**: Keep business logic separated from UI components.
4. **Styling**: Use React Native's `StyleSheet.create` natively.

# Expected Behavior

- When analyzing code or suggesting changes, proactively call out architectural flaws or potential JS thread bottlenecks.
- Provide clean, maintainable, and highly optimized code without over-engineering.
- If you see deprecated APIs or poor dependency management, suggest immediate modern alternatives.

---

# Copilot Instructions — RunForce App

## Code Style Conventions

**Imports — always single-line per source.** All named imports from the same module must stay on one line. Never break named imports across multiple lines.

**TypeScript — always use strict typing.** Avoid `any` and prefer explicit types/interfaces. Use type inference only when it enhances readability.

**Functions — always use arrow functions for component definitions and callbacks.** Avoid function declarations.

**Component structure — always define components in the following order: 1) imports, 2) types/interfaces, 3) component definition, 4) styles.** This keeps files organized and predictable.

**Code regions — wrap every logical block of changes in a region/endregion pair.** Use a short, descriptive label. Do not add inline comments explaining what the code does:

```ts
// region Functions
const onStart = useCallback(() => { ... }, []);
// endregion

// region Styles
const styles = StyleSheet.create({ ... });
// endregion
```

---

# Project Architecture — RunForce Tracker

## Tech Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Framework     | Expo SDK 54 (React Native 0.81.5)                 |
| Language      | TypeScript 5.9 (strict mode)                      |
| Routing       | Expo Router v6 (file-based)                       |
| Animations    | React Native Reanimated 4                         |
| GPS / Sensors | `expo-location` (`BestForNavigation` accuracy)    |
| Persistence   | `@react-native-async-storage/async-storage`       |
| Icons         | `@expo/vector-icons` → `MaterialCommunityIcons`   |
| SVG           | `react-native-svg`                                |
| Gestures      | `react-native-gesture-handler`                    |
| Screen Wake   | `expo-keep-awake`                                 |
| Architecture  | New Architecture enabled (`newArchEnabled: true`) |

## Folder Structure

```
RunForce/
├── app/                          # Expo Router — file-based routes only
│   ├── _layout.tsx               # Root layout: GestureHandlerRootView, ThemeProvider, Stack navigator
│   ├── tracking.tsx              # Full-screen tracking modal (re-exports from views/)
│   └── (tabs)/
│       ├── _layout.tsx           # Tab navigator: Home tab, Records tab
│       ├── index.tsx             # Home tab (re-exports from views/)
│       └── records.tsx           # Records tab (re-exports from views/)
│
├── views/                        # Screen-level components — all business logic lives here
│   ├── home-screen.tsx           # Dashboard: speedometer gauge, metrics, activity selector, start FAB
│   ├── tracking-screen.tsx       # Active session: distance, timer, pace indicator, pause/stop controls
│   └── records-screen.tsx        # Session history: filterable list, glass cards, mini route maps
│
├── components/                   # Pure, reusable UI components — no business logic
│   ├── speed-gauge.tsx           # Animated SVG circular speedometer (SharedValue-driven)
│   ├── metric-card.tsx           # Large metric tile (label + SharedValue text + unit)
│   ├── small-metric-card.tsx     # Compact stat row card (label + SharedValue text + unit)
│   ├── activity-selector.tsx     # Run / Walk / Bike / Drive activity pill selector
│   ├── record-card.tsx           # Session history card with inline SVG mini-map
│   ├── app-header.tsx            # RunForce branded header with live status dot
│   └── ui/
│       ├── reanimated-text.tsx   # 60fps text via Animated.TextInput + useAnimatedProps
│       ├── icon-symbol.tsx       # Cross-platform icon abstraction
│       ├── icon-symbol.ios.tsx   # iOS-specific SF Symbol icon
│       └── collapsible.tsx       # Animated collapsible section
│
├── services/                     # Side-effect logic — GPS, storage (no UI)
│   ├── location-tracking.ts      # GPS hook: speed smoothing, Haversine distance, accuracy gating
│   └── session-storage.ts        # AsyncStorage CRUD for RunSession records
│
├── hooks/                        # Stateful logic hooks
│   ├── use-stopwatch.ts          # High-precision stopwatch using SharedValue + setInterval
│   ├── use-theme-colors.ts       # Returns typed color tokens for current color scheme
│   ├── use-color-scheme.ts       # Wraps RN useColorScheme
│   └── use-color-scheme.web.ts   # Web-specific color scheme override
│
├── types/
│   └── activity.ts               # Core domain types: RunSession, ActivityType, LocationPoint, GpsSignalStrength
│
├── constants/
│   └── theme.ts                  # Full design token system (Colors, Spacing, Radii, Shadows, Fonts)
│
└── assets/
    └── images/                   # App icons, splash screens
```

## Routing Map

```
/                   →  (tabs)/index     →  HomeScreen
/records            →  (tabs)/records   →  RecordsScreen
/tracking           →  tracking         →  TrackingScreen  [fullScreenModal, slide_from_bottom]
```

Route files under `app/` are thin re-export files (`export { default } from '@/views/...'`). All real logic is in `views/`.

## State & Data Flow

### Real-time Sensor Data (60fps, UI thread)

All live metrics use **Reanimated SharedValues** — they never touch the JS thread during updates:

```
expo-location.watchPositionAsync()
  → useLocationTracking() hook
      → currentSpeed (SharedValue<number>)
      → totalDistance (SharedValue<number>)
      → maxSpeed (SharedValue<number>)
      → avgSpeed (SharedValue<number>)
      → elevation (SharedValue<number>)
      → gpsSignal (SharedValue<GpsSignalStrength>)
  → useDerivedValue() → formatted strings
  → ReanimatedText (Animated.TextInput) → renders at 60fps on UI thread
```

### Timer

```
useStopwatch()
  → elapsed (SharedValue<number>)   ← updated by setInterval every 100ms
  → formatTime(elapsed.value)       ← worklet, runs on UI thread
```

### Session Persistence

```
TrackingScreen  →  onStop()
  → builds RunSession object
  → addSession()  →  AsyncStorage.setItem('@runforce_sessions')

RecordsScreen  →  useFocusEffect
  → loadSessions()  →  AsyncStorage.getItem('@runforce_sessions')
  → renders RecordCard list
```

## Key Files Reference

| File                                | Purpose                                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `constants/theme.ts`                | Single source of truth for all colors, spacing, shadows. Always import from here — never hardcode values.                             |
| `types/activity.ts`                 | All domain types. Extend here when adding new entity shapes.                                                                          |
| `services/location-tracking.ts`     | GPS hook. Contains speed smoothing constant (`SPEED_SMOOTHING_FACTOR = 0.3`) and accuracy threshold (`MIN_ACCURACY_THRESHOLD = 50m`). |
| `services/session-storage.ts`       | AsyncStorage key is `@runforce_sessions`. All session reads/writes go through this file.                                              |
| `components/ui/reanimated-text.tsx` | The only way to render SharedValue strings at 60fps. Always use this instead of `<Text>` for live data.                               |
| `hooks/use-stopwatch.ts`            | `elapsed` is a SharedValue in milliseconds. `formatTime()` and `formatTimeCompact()` are worklets.                                    |

## Design System

The app uses a **cyber/neon-lime** visual language matching the provided HTML designs:

| Token            | Value                                            |
| ---------------- | ------------------------------------------------ |
| Brand / Accent   | `#80f20d` (neon lime)                            |
| Dark Background  | `#0a0a0a`                                        |
| Dark Surface     | `#121212`                                        |
| Dark Card        | `rgba(255,255,255,0.03)`                         |
| Light Background | `#ffffff`                                        |
| Light Surface    | `#f4f4f5`                                        |
| Neon Shadow      | `shadowColor: #80f20d, opacity: 0.4, radius: 15` |

Always consume colors via `useThemeColors()` — never reference `Colors.dark` or `Colors.light` directly inside components.

## Performance Rules

1. **Never use `useState` for real-time sensor data** (speed, distance, timer). Always use `useSharedValue`.
2. **`useDerivedValue` for derived strings** — keeps format logic on the UI thread.
3. **`ReanimatedText`** is the only component that can display a `SharedValue<string>` at 60fps.
4. **`useCallback` on all event handlers** passed as props to prevent child re-renders.
5. **`FlatList` with `keyExtractor` and memoized `renderItem`** for session lists.
6. **`activateKeepAwakeAsync()`** must be called at the start of every tracking session and `deactivateKeepAwake()` on cleanup.
7. **Location subscription cleanup** — always call `subscription.remove()` in `useEffect` cleanup.

## Activity Types

```ts
type ActivityType = "run" | "walk" | "bike" | "drive";
```

Each activity maps to a `MaterialCommunityIcons` icon: `run`, `walk`, `bike`, `car`.

## Adding a New Screen

1. Create the view in `views/my-screen.tsx`
2. Add a thin route file in `app/my-screen.tsx`:
   ```ts
   export { default } from "@/views/my-screen";
   ```
3. Register it in `app/_layout.tsx` under `<Stack>` if it's a modal, or in `app/(tabs)/_layout.tsx` if it's a tab.

## Adding a New Metric

1. Expose a new `SharedValue` from `useLocationTracking()` in `services/location-tracking.ts`
2. Create a `useDerivedValue` formatted string in the screen
3. Pass it to `<MetricCard>` or `<SmallMetricCard>` — never convert to state

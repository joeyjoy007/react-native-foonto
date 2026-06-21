import {
  IconHome,
  IconMovie,
  IconSearch,
  IconSquareRoundedPlus,
  IconUser,
} from '@tabler/icons-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import type { ScrollView } from 'react-native';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BlobTabBar, type BlobTab } from 'react-native-foonto';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type TablerIcon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const tablerIcon =
  (Icon: TablerIcon) =>
  (active: boolean) =>
    <Icon size={26} color={active ? '#111' : '#9ca3af'} strokeWidth={active ? 2.4 : 1.8} />;

const TABS: BlobTab[] = [
  { key: 'home', icon: tablerIcon(IconHome) },
  { key: 'search', icon: tablerIcon(IconSearch) },
  { key: 'create', icon: tablerIcon(IconSquareRoundedPlus) },
  { key: 'reels', icon: tablerIcon(IconMovie) },
  { key: 'profile', icon: tablerIcon(IconUser) },
];

const PAGES = [
  { key: 'home', title: 'Home', colors: ['#6d28d9', '#a855f7'] as const },
  { key: 'search', title: 'Search', colors: ['#2563eb', '#0ea5e9'] as const },
  { key: 'create', title: 'Create', colors: ['#16a34a', '#22c55e'] as const },
  { key: 'reels', title: 'Reels', colors: ['#db2777', '#f43f5e'] as const },
  { key: 'profile', title: 'Profile', colors: ['#ea580c', '#f59e0b'] as const },
];

export default function BlobTabBarScreen() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0);
  const [active, setActive] = useState('home');

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  // Fractional tab index the pill follows while swiping.
  const indicatorIndex = useDerivedValue(() => (width > 0 ? scrollX.value / width : 0));

  function goTo(key: string) {
    const index = TABS.findIndex((t) => t.key === key);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActive(key);
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActive(TABS[index]?.key ?? 'home');
        }}
      >
        {PAGES.map((page) => (
          <LinearGradient key={page.key} colors={page.colors} style={[styles.page, { width }]}>
            <Text style={styles.pageTitle}>{page.title}</Text>
            <Text style={styles.pageHint}>Swipe left / right — the pill follows.</Text>
          </LinearGradient>
        ))}
      </Animated.ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.tabBarWrap} pointerEvents="box-none">
        <BlobTabBar
          tabs={TABS}
          activeKey={active}
          onChange={goTo}
          indicatorIndex={indicatorIndex}
        />
        <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
          Glassy bar · gray pill · no spring
        </ThemedText>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  page: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.two },
  pageTitle: { fontSize: 40, fontWeight: '800', color: '#fff', lineHeight: 48 },
  pageHint: { fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  tabBarWrap: {
    position: 'absolute',
    left: Spacing.four,
    right: Spacing.four,
    bottom: Spacing.three,
    gap: Spacing.two,
  },
  caption: { textAlign: 'center', color: 'rgba(255,255,255,0.9)' },
});

import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IconBell,
  IconCards,
  IconCheckbox,
  IconColumns,
  IconDeviceMobile,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconList,
  IconMountain,
  IconPhoto,
  IconSearch,
  IconShare,
  IconSparkles,
  IconStack2,
} from '@tabler/icons-react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type TablerIcon = React.ComponentType<{ size?: number; color?: string }>;

type Demo = {
  href: Href;
  title: string;
  description: string;
  accent: string;
  Icon: TablerIcon;
};

const DEMOS: Demo[] = [
  { href: '/swipe-deck', title: 'Swipe Deck', description: 'Tinder-style draggable card stack', accent: '#FF5864', Icon: IconCards },
  { href: '/skeleton', title: 'Skeleton', description: 'Shimmering content placeholders', accent: '#8E9AAF', Icon: IconSparkles },
  { href: '/shared-transition', title: 'Shared Transition', description: 'Animate elements across screens', accent: '#208AEF', Icon: IconShare },
  { href: '/parallax-header', title: 'Parallax Header', description: 'Parallax + pull-to-zoom scroll header', accent: '#A855F7', Icon: IconMountain },
  { href: '/animated-checkbox', title: 'Animated Checkbox', description: 'Pop-in checkmark with a fill scale', accent: '#34C759', Icon: IconCheckbox },
  { href: '/otp-input', title: 'OTP Input', description: 'Segmented code field with bounce', accent: '#FF9F0A', Icon: IconDeviceMobile },
  { href: '/search-bar', title: 'Search Bar', description: 'Expands from an icon to full width', accent: '#5AC8FA', Icon: IconSearch },
  { href: '/toast', title: 'Toast', description: 'Stacking, auto-dismissing notifications', accent: '#27272A', Icon: IconBell },
  { href: '/stack-cards', title: 'Stack Cards', description: 'Swipe to cycle a wallet-style stack', accent: '#0EA5E9', Icon: IconStack2 },
  { href: '/blob-tab-bar', title: 'Blob Tab Bar', description: 'Bottom nav with a sliding blob', accent: '#6D28D9', Icon: IconLayoutGrid },
  { href: '/drag-list', title: 'Drag & Drop List', description: 'Long-press to reorder rows', accent: '#F43F5E', Icon: IconList },
  { href: '/carousel', title: 'Carousel', description: 'Center-focused snapping cards', accent: '#312E81', Icon: IconColumns },
  { href: '/parallax-carousel', title: 'Parallax Carousel', description: 'Full-width pages with drifting art', accent: '#22D3EE', Icon: IconPhoto },
  { href: '/masonry-grid', title: 'Masonry Grid', description: 'Staggered two-column reveal', accent: '#A855F7', Icon: IconLayoutDashboard },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title">Foonto</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Beautiful, open-source React Native animations.
            </ThemedText>
          </View>

          {DEMOS.map((demo) => (
            <Link key={demo.title} href={demo.href} asChild>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <View style={[styles.badge, { backgroundColor: demo.accent }]}>
                    <demo.Icon size={26} color="#ffffff" />
                  </View>
                  <View style={styles.cardText}>
                    <ThemedText style={styles.cardTitle}>{demo.title}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {demo.description}
                    </ThemedText>
                  </View>
                </ThemedView>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.four,
  },
  pressed: { opacity: 0.7 },
  badge: {
    width: 52,
    height: 52,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
});

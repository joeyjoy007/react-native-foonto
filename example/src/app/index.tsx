import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Demo = {
  href: Href;
  title: string;
  description: string;
  accent: string;
  emoji: string;
};

const DEMOS: Demo[] = [
  {
    href: '/swipe-deck',
    title: 'Swipe Deck',
    description: 'Tinder-style draggable card stack',
    accent: '#FF5864',
    emoji: '🃏',
  },
  {
    href: '/skeleton',
    title: 'Skeleton',
    description: 'Shimmering content placeholders',
    accent: '#8E9AAF',
    emoji: '✨',
  },
  {
    href: '/shared-transition',
    title: 'Shared Transition',
    description: 'Animate elements across screens',
    accent: '#208AEF',
    emoji: '🔀',
  },
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
                    <ThemedText style={styles.emoji}>{demo.emoji}</ThemedText>
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
  emoji: { fontSize: 26 },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
});

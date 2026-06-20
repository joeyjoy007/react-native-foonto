import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ParallaxCarousel } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const SLIDES = [
  { id: '1', title: 'Kyoto', emoji: '⛩️', colors: ['#6d28d9', '#a855f7'] as const },
  { id: '2', title: 'Santorini', emoji: '🏖️', colors: ['#0ea5e9', '#22d3ee'] as const },
  { id: '3', title: 'Banff', emoji: '🏔️', colors: ['#16a34a', '#4ade80'] as const },
  { id: '4', title: 'Sahara', emoji: '🏜️', colors: ['#f59e0b', '#fb923c'] as const },
];

export default function ParallaxCarouselScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ParallaxCarousel
          data={SLIDES}
          height={440}
          intensity={0.35}
          renderItem={(item) => (
            <LinearGradient colors={item.colors} style={styles.fill}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </LinearGradient>
          )}
          renderOverlay={(item) => (
            <View style={styles.overlay}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
            </View>
          )}
        />
        <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
          Swipe — the background drifts slower than the page.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: 'center', gap: Spacing.four },
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 120 },
  overlay: { flex: 1, justifyContent: 'flex-end', padding: Spacing.four },
  title: { color: '#fff', fontSize: 34, fontWeight: '800', lineHeight: 40 },
  caption: { textAlign: 'center' },
});

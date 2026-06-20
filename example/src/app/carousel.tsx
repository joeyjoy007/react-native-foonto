import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const POSTERS = [
  { id: '1', title: 'Nebula', tag: 'Sci-Fi', colors: ['#6d28d9', '#312e81'] as const },
  { id: '2', title: 'Tidal', tag: 'Drama', colors: ['#0ea5e9', '#0369a1'] as const },
  { id: '3', title: 'Ember', tag: 'Action', colors: ['#db2777', '#7f1d1d'] as const },
  { id: '4', title: 'Canopy', tag: 'Nature', colors: ['#16a34a', '#14532d'] as const },
  { id: '5', title: 'Dune', tag: 'Adventure', colors: ['#f59e0b', '#92400e'] as const },
];

export default function CarouselScreen() {
  const [index, setIndex] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <Carousel
          data={POSTERS}
          itemHeight={380}
          onIndexChange={setIndex}
          renderItem={(item) => (
            <LinearGradient colors={item.colors} style={styles.card}>
              <View style={styles.badge}>
                <ThemedText style={styles.tag}>{item.tag}</ThemedText>
              </View>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
            </LinearGradient>
          )}
        />
        <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
          Now showing: {POSTERS[index]?.title}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: 'center', gap: Spacing.four },
  card: {
    flex: 1,
    borderRadius: 24,
    padding: Spacing.four,
    justifyContent: 'flex-end',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: Spacing.two,
  },
  tag: { color: '#fff', fontSize: 12, fontWeight: '700' },
  title: { color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 36 },
  caption: { textAlign: 'center' },
});

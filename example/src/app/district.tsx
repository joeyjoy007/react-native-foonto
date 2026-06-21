import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { District, type DistrictItem } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const CATEGORIES: DistrictItem[] = [
  { key: 'dining', label: 'Dining', color: '#FEE2E2' },
  { key: 'movies', label: 'Movies', color: '#E0E7FF' },
  { key: 'events', label: 'Events', color: '#DCFCE7' },
  { key: 'stores', label: 'Stores', color: '#FEF9C3' },
  { key: 'activities', label: 'Activities', color: '#FCE7F3' },
  { key: 'play', label: 'Play', color: '#CFFAFE' },
];

export default function DistrictScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="subtitle">District</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Tap a category — the grid collapses into a bar.
          </ThemedText>
        </View>

        <District data={CATEGORIES} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.five,
  },
  header: { gap: Spacing.one },
});

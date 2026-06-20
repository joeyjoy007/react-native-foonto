import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement, SharedTransitionProvider } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function SharedTransitionScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <SharedTransitionProvider>
          <SharedElement id="hero" style={styles.hero}>
            <ThemedText style={styles.heroText}>Tap to expand</ThemedText>
          </SharedElement>
        </SharedTransitionProvider>
        <View style={styles.note}>
          <ThemedText type="small" themeColor="textSecondary">
            Shared element transition demo — implementation in progress.
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  hero: {
    height: 160,
    borderRadius: Spacing.four,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  note: { alignItems: 'center' },
});

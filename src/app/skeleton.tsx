import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from 'react-native-foonto';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function SkeletonScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            <Skeleton circle height={48} />
            <View style={styles.lines}>
              <Skeleton width="70%" height={14} />
              <Skeleton width="40%" height={14} />
            </View>
          </View>
        ))}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  lines: { flex: 1, gap: Spacing.two },
});

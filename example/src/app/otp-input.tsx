import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function OtpInputScreen() {
  const [code, setCode] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Verify it&apos;s you</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
            Enter the 4-digit code we sent you.
          </ThemedText>
        </View>

        <OtpInput
          length={4}
          value={code}
          onChange={(v) => {
            setCode(v);
            setCompleted(false);
          }}
          onComplete={() => setCompleted(true)}
          autoFocus
        />

        <ThemedText
          type="small"
          themeColor={completed ? 'text' : 'textSecondary'}
          style={styles.center}
        >
          {completed ? '✅ Code complete!' : 'Each digit bounces as you type.'}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.five, alignItems: 'center', justifyContent: 'center' },
  header: { gap: Spacing.two, alignItems: 'center' },
  center: { textAlign: 'center' },
});

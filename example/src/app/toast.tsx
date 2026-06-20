import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastProvider, useToast, type ToastVariant } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const BUTTONS: { variant: ToastVariant; label: string; color: string; title: string; message: string }[] = [
  { variant: 'success', label: 'Success', color: '#16a34a', title: 'Saved', message: 'Your changes were saved.' },
  { variant: 'error', label: 'Error', color: '#dc2626', title: 'Upload failed', message: 'Please try again later.' },
  { variant: 'info', label: 'Info', color: '#2563eb', title: 'Heads up', message: 'A new version is available.' },
  { variant: 'default', label: 'Default', color: '#27272a', title: '', message: 'Copied to clipboard' },
];

function Demo() {
  const toast = useToast();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
          Tap to fire a toast. They stack, auto-dismiss, and slide as they go.
        </ThemedText>
        <View style={styles.grid}>
          {BUTTONS.map((b) => (
            <Pressable
              key={b.label}
              style={[styles.button, { backgroundColor: b.color }]}
              onPress={() =>
                toast.show({
                  variant: b.variant,
                  title: b.title || undefined,
                  message: b.message,
                })
              }
            >
              <ThemedText style={styles.buttonText}>{b.label}</ThemedText>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

export default function ToastScreen() {
  return (
    <ToastProvider position="top" topOffset={80}>
      <Demo />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.four, justifyContent: 'center' },
  center: { textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three, justifyContent: 'center' },
  button: {
    minWidth: 140,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

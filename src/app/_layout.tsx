import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'rn-foonto' }} />
          <Stack.Screen name="swipe-deck" options={{ title: 'Swipe Deck' }} />
          <Stack.Screen name="skeleton" options={{ title: 'Skeleton' }} />
          <Stack.Screen name="shared-transition" options={{ title: 'Shared Transition' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

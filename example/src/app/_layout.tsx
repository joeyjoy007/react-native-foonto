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
          <Stack.Screen name="shared-transition/index" options={{ title: 'Shared Transition' }} />
          <Stack.Screen name="shared-transition/[id]" options={{ title: 'Detail' }} />
          <Stack.Screen name="parallax-header" options={{ title: 'Parallax Header', headerTransparent: true, headerTitle: '' }} />
          <Stack.Screen name="animated-checkbox" options={{ title: 'Animated Checkbox' }} />
          <Stack.Screen name="otp-input" options={{ title: 'OTP Input' }} />
          <Stack.Screen name="search-bar" options={{ title: 'Search Bar' }} />
          <Stack.Screen name="toast" options={{ title: 'Toast' }} />
          <Stack.Screen name="stack-cards" options={{ title: 'Stack Cards' }} />
          <Stack.Screen name="blob-tab-bar" options={{ title: 'Blob Tab Bar' }} />
          <Stack.Screen name="drag-list" options={{ title: 'Drag & Drop List' }} />
          <Stack.Screen name="carousel" options={{ title: 'Carousel' }} />
          <Stack.Screen name="parallax-carousel" options={{ title: 'Parallax Carousel' }} />
          <Stack.Screen name="masonry-grid" options={{ title: 'Masonry Grid' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

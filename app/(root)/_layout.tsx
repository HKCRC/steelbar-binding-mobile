import { Stack } from 'expo-router';
import '@/global.css';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
export default function RootLayout() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="(login)" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="(setting)" options={{ title: 'Settings', headerShown: false }} />
      <Stack.Screen name="(error)" options={{ title: 'Error', headerShown: false }} />
    </Stack>
  );
}

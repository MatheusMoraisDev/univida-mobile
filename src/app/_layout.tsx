import { ThemeProvider } from 'styled-components'
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { theme } from '../styles'
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from 'react';
import { UserProvider } from '../contexts/userContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_800ExtraBold
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="signUp" options={{headerShown: false}} />
          <Stack.Screen name="validationEmail" options={{headerShown: false}} />
          <Stack.Screen name="(donator)" options={{headerShown: false}} />
          <Stack.Screen name="(hospital)" options={{headerShown: false}} />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}

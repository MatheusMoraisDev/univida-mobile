import { ThemeProvider } from 'styled-components'
import { Slot, Stack } from "expo-router";
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

  if (!loaded) {
    return ;
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Slot />
      </Stack>
    </ThemeProvider>
  );
}

import { Stack } from "expo-router";

export default function DonatorFormLayout() {

  return (
    <Stack>
      <Stack.Screen name="signUpDonator" options={{ headerShown: false }} />
      <Stack.Screen name="donatorPanel/index" options={{ headerShown: false }} />
    </Stack>
  );
}

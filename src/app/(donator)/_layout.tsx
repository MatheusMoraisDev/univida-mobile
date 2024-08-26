import { Stack } from "expo-router";

export default function DonatorFormLayout() {
  return (
    <Stack>
      <Stack.Screen name="signUpDonator" options={{ headerShown: false }} />
      <Stack.Screen name="donatorPanel" options={{ headerShown: false }} />
    </Stack>
  );
}

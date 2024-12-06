import { Stack } from "expo-router";

export default function DonatorPanelNonTabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="content" options={{ headerShown: false }} />
      <Stack.Screen name="listDonation" options={{ headerShown: false }} />
      <Stack.Screen name="findDonators" options={{ headerShown: false }} />
      <Stack.Screen
        name="record"
        options={{ headerShown: false, title: "Registros" }}
      />
    </Stack>
  );
}

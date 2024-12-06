import { Stack } from "expo-router";

export default function HospitalFormLayout() {
  return (
    <Stack>
      <Stack.Screen name="signUpHospital" options={{ headerShown: false }} />
      <Stack.Screen name="hospitalPanel" options={{ headerShown: false }} />
    </Stack>
  );
}

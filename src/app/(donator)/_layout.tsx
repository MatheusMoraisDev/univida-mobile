import { IDonator } from "@/src/interfaces/donator.interface";
import { Stack } from "expo-router";
import { Formik } from "formik";

export default function DonatorFormLayout() {

  return (
    <Stack>
      <Stack.Screen name="signUpDonator" options={{ headerShown: false }} />
    </Stack>
  );
}

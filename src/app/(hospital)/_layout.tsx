import { IDonator } from "@/src/interfaces/donator.interface";
import { Stack } from "expo-router";
import { Formik } from "formik";

export default function HospitalFormLayout() {

  return (
    <Stack>
      <Stack.Screen name="signUpHospital" options={{ headerShown: false }} />
    </Stack>
  );
}

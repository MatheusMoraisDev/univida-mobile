import { IDonator } from "@/src/interfaces/donator.interface";
import { Stack } from "expo-router";
import { Formik } from "formik";

export default function DonatorFormLayout() {
  const initialValues: IDonator = {
    firstName: '',
    lastName: '',
    birthDate: '',
    cpf: '',
    rg: '',
    contacts: [
      {
        contact: '',
        emergency_contact: '',
        emergency_contact_name: '',
      },
    ],
    user: {
      email: '',
      type: '',
      password: '',
      confirmPassword: '',
    },
    addresses: [
      {
        street: '',
        zip: '',
        number: 0,
        neighborhood: '',
        state: '',
        city: '',
      },
    ],
    donatorDetails: {
      orientation: '',
      gender: '',
      bloodType: '',
      weightKilo: 0,
      hasAllergy: false,
      hasActiveSexLive: false,
      hasTattoo: false,
      allergyDescription: null,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Stack>
          <Stack.Screen name="index" options={{ title: "Dados do Hospital" }} />
          <Stack.Screen name="signUpAddress" options={{ title: "Endereço" }} />
        </Stack>
      )}
    </Formik>
  );
}

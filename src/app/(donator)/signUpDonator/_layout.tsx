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
    address: '',
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
      created_at: '',
      updated_at: '',
      deleted_at: null,
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
      weightKilo: 0,
      hasAllergy: false,
      hasActiveSexLive: false,
      hasTattoo: false,
      bloodType: '',
      allergyDescription: null,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Stack screenOptions={{ headerTransparent: true, headerTitle: ""}}>
          <Stack.Screen name="index" options={{ title: "Dados Pessoais" }} />
          <Stack.Screen name="signUpAddress" options={{ title: "Endereço" }} />
          <Stack.Screen name="signUpHealth" options={{ title: "Saúde" }} />
        </Stack>
      )}
    </Formik>
  );
}

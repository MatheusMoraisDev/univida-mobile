import { IHospital } from "@/src/interfaces/hospital.interface";
import { theme } from "@/src/styles";
import { Stack } from "expo-router";
import { Formik } from "formik";

export default function HospitalFormLayout() {
  const initialValues: IHospital = {
    name: "",
    cnpj: "",
    hospitalType: "",
    contacts: [
      {
        contact: "",
      },
    ],
    user: {
      email: "",
      type: "",
      password: "",
      confirmPassword: "",
    },
    addresses: [
      {
        street: "",
        zip: "",
        number: 0,
        neighborhood: "",
        state: "",
        city: "",
      },
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontFamily: theme.fonts.Inter_600SemiBold,
              fontSize: theme.metrics.px(16),
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="firstStep"
            options={{ title: "Dados do Hospital" }}
          />
          <Stack.Screen
            name="secondStep"
            options={{ title: "Crie sua senha" }}
          />
          <Stack.Screen
            name="thirdStep"
            options={{ title: "Endereço do Hospital" }}
          />
          <Stack.Screen
            name="fourthStep"
            options={{ title: "Contato do Hospital" }}
          />
        </Stack>
      )}
    </Formik>
  );
}

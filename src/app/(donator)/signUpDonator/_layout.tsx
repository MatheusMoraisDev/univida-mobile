import { IDonator } from "@/src/interfaces/donator.interface";
import { theme } from "@/src/styles";
import validationDonatorSchema from "@/src/utils/schemas/validationDonatorSchema";
import { Stack } from "expo-router";
import { Formik } from "formik";

export default function DonatorFormLayout() {
  const initialValues: IDonator = {
    firstName: "",
    lastName: "",
    birthDate: "",
    cpf: "",
    rg: "",
    contacts: [
      {
        contact: "",
        emergency_contact: "",
        emergency_contact_name: "",
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
    donatorDetails: {
      orientation: "",
      gender: "",
      weightKilo: 0,
      hasAllergy: false,
      bloodType: "",
      allergyDescription: null,
      hasActiveSexLife: false,
      hasCasualActiveSexLife: false,
      hasTatoos: false,
      tatooQuantity: 0,
      hadUseDrugs: false,
      drugDescription: "",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async () => {
        console.log(
          "Voltar aqui depois para implementar a submissão do formulário",
        );
      }}
      validationSchema={validationDonatorSchema}
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
            options={{ title: "Dados Pessoais", headerBackVisible: false }}
          />
          <Stack.Screen
            name="secondStep"
            options={{ title: "Crie sua Senha" }}
          />
          <Stack.Screen name="thirdStep" options={{ title: "Endereço" }} />
          <Stack.Screen name="fourthStep" options={{ title: "Contato" }} />
          <Stack.Screen name="fifthStep" options={{ title: "Saúde" }} />
        </Stack>
      )}
    </Formik>
  );
}

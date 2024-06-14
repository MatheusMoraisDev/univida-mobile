import { IDonator } from "@/src/interfaces/donator.interface";
import { Stack } from "expo-router";
import { Formik } from "formik";
import * as Yup from 'yup';

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
      weightKilo: 0,
      hasAllergy: false,
      hasActiveSexLive: false,
      hasTattoo: false,
      bloodType: '',
      allergyDescription: null,
    },
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('Primeiro nome é obrigatório'),
    lastName: Yup.string()
      .required('Sobrenome é obrigatório'),
    birthDate: Yup.string()
      .required('Data de nascimento é obrigatória'),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
      .required('CPF é obrigatório'),
    rg: Yup.string()
      .required('RG é obrigatório'),
    address: Yup.string()
      .required('Endereço é obrigatório'),
    user: Yup.object({
      email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
      password: Yup.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Senhas não coincidem')
        .required('Confirmação de senha é obrigatória'),
    }),
    addresses: Yup.array().of(
      Yup.object().shape({
        street: Yup.string().required('Rua é obrigatória'),
        zip: Yup.string()
          .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
          .required('CEP é obrigatório'),
        number: Yup.number().required('Número é obrigatório'),
        neighborhood: Yup.string().required('Bairro é obrigatório'),
        state: Yup.string().required('Estado é obrigatório'),
        city: Yup.string().required('Cidade é obrigatória'),
      })
    ),
    contacts: Yup.array().of(
      Yup.object().shape({
        contact: Yup.string()
          .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
          .required('Contato é obrigatório'),
        emergency_contact: Yup.string()
          .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone de emergência inválido')
          .notRequired(),
        emergency_contact_name: Yup.string()
          .notRequired(),
      })
    ),
    donatorDetails: Yup.object().shape({
      orientation: Yup.string()
        .required('Orientação sexual é obrigatória.'),
      gender: Yup.string()
        .required('Gênero é obrigatório.'),
      weightKilo: Yup.number()
        .required('Peso em kg é obrigatório.')
        .min(1, 'Peso mínimo é 1 kg.')
        .max(300, 'Peso máximo é 300 kg.'),
      hasAllergy: Yup.boolean()
        .required('Campo "Possui alergia?" é obrigatório.'),
      hasActiveSexLive: Yup.boolean(),
      hasTattoo: Yup.boolean(),
      bloodType: Yup.string()
        .required('Tipo sanguíneo é obrigatório.'),
      allergyDescription: Yup.string()
  })
});  

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async () => {
        console.log('Voltar aqui depois para implementar a submissão do formulário')
      }}
      validationSchema={validationSchema}
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

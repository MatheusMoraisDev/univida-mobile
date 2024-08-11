import * as Yup from "yup";

const validationDonatorSchema = Yup.object({
  firstName: Yup.string().required("Primeiro nome é obrigatório"),
  lastName: Yup.string().required("Sobrenome é obrigatório"),
  birthDate: Yup.string().required("Data de nascimento é obrigatória"),
  cpf: Yup.string().required("CPF é obrigatório"),
  rg: Yup.string().required("RG é obrigatório"),
  address: Yup.string().required("Endereço é obrigatório"),
  user: Yup.object({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .matches(/[0-9]/, "A senha deve conter pelo menos um número.")
      .matches(
        /[#?!@$ %^&*-]/,
        "A senha deve conter pelo menos um caractere especial.",
      )
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .required("A senha é obrigatória"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
  }),
  addresses: Yup.array().of(
    Yup.object().shape({
      street: Yup.string().required("Rua é obrigatória"),
      zip: Yup.string().required("CEP é obrigatório"),
      number: Yup.number().required("Número é obrigatório"),
      neighborhood: Yup.string().required("Bairro é obrigatório"),
      state: Yup.string().required("Estado é obrigatório"),
      city: Yup.string().required("Cidade é obrigatória"),
    }),
  ),
  contacts: Yup.array().of(
    Yup.object().shape({
      contact: Yup.string().required("Contato é obrigatório"),
      emergency_contact: Yup.string().notRequired(),
      emergency_contact_name: Yup.string().notRequired(),
    }),
  ),
  donatorDetails: Yup.object().shape({
    orientation: Yup.string().required("Orientação sexual é obrigatória."),
    gender: Yup.string().required("Gênero é obrigatório."),
    weightKilo: Yup.number()
      .required("Peso em kg é obrigatório.")
      .min(1, "Peso mínimo é 1 kg.")
      .max(300, "Peso máximo é 300 kg."),
    hasAllergy: Yup.boolean().required(
      'Campo "Possui alergia?" é obrigatório.',
    ),
    hasActiveSexLife: Yup.boolean().required(
      'Campo "Possui vida sexual ativa?" é obrigatório.',
    ),
    bloodType: Yup.string().required("Tipo sanguíneo é obrigatório."),
    allergyDescription: Yup.string().required(
      "Descrição da alergia é obrigatória.",
    ),
    hasCasualActiveSexLife: Yup.boolean().required(
      'Campo "Possui vida sexual ativa?" é obrigatório.',
    ),
    hasTatoos: Yup.boolean().required(
      'Campo "Possui tatuagens?" é obrigatório.',
    ),
    tatooQuantity: Yup.number().required(
      "Quantidade de tatuagens é obrigatória.",
    ),
    hadUseDrugs: Yup.boolean(),
    drugDescription: Yup.string().required(
      "Descrição do uso de drogas é obrigatória.",
    ),
  }),
});

export default validationDonatorSchema;

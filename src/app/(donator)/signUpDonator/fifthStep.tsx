import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import PaperInput from "@/src/components/atoms/paperInput";
import CustomRadioButton from "@/src/components/atoms/radioButton";
import CustomText from "@/src/components/atoms/text";
import SelectInput from "@/src/components/molecules/selectInput";
import Steps from "@/src/components/molecules/steps";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";

const signUpHealthDonator = () => {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    validateForm,
    setTouched,
    handleChange,
    setErrors,
  } = useFormikContext<IDonator>();
  const router = useRouter();

  const isCurrentStepValid = (): boolean => {
    const requiredFields: Array<string> = [
      "donatorDetails.bloodType",
      "donatorDetails.hasAllergy",
      "donatorDetails.weightKilo",
      "donatorDetails.gender",
      "donatorDetails.orientation",
    ];

    if (values.donatorDetails.hasAllergy) {
      requiredFields.push("donatorDetails.allergyDescription");
    }

    return requiredFields.every((field) => {
      const [parent, child] = field.split(".") as [
        keyof IDonator,
        keyof IDonator["user"],
      ];
      if (child) {
        if (field === "donatorDetails.hasAllergy") {
          return !(errors[parent] as any)?.[child];
        }
        return (
          (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child]
        );
      }
      return (
        values[field as keyof IDonator] && !errors[field as keyof IDonator]
      );
    });
  };

  const handleNavigate = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        router.push("signUpDonator/sixthStep");
      } else {
        setTouched({
          donatorDetails: {
            bloodType: true,
            hasAllergy: true,
            weightKilo: true,
            gender: true,
            orientation: true,
          },
        });

        if (values.donatorDetails.hasAllergy) {
          setTouched({
            donatorDetails: {
              allergyDescription: true,
            },
          });
        }
        setErrors(errors);
      }
    });
  };

  const handleBooleanConvert = (value: string) => {
    const hasAllergy = value === "Sim";
    setFieldValue("donatorDetails.hasAllergy", hasAllergy);
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={5} totalSteps={6} />
        <SelectInput
          handleChange={handleChange("donatorDetails.bloodType")}
          label="Tipo sanguíneo *"
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          placeholder="Selecione o tipo sanguíneo"
          value={values.donatorDetails.bloodType ?? ""}
        />
        {touched.donatorDetails?.bloodType &&
        errors.donatorDetails?.bloodType ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.bloodType}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Sim", "Não"]}
          onValueChange={handleBooleanConvert}
          title="Possui alergia?"
        />
        {touched.donatorDetails?.hasAllergy &&
        errors.donatorDetails?.hasAllergy ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hasAllergy}
          </CustomText>
        ) : null}

        {values.donatorDetails.hasAllergy && (
          <PaperInput
            label="Qual alergia você possui?"
            placeholder="Antinflamatórios, penicilina, etc."
            value={values.donatorDetails.allergyDescription || ""}
            onChange={handleChange("donatorDetails.allergyDescription")}
            mt={5}
          />
        )}
        {values.donatorDetails.hasAllergy &&
        touched.donatorDetails?.allergyDescription &&
        errors.donatorDetails?.allergyDescription ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.allergyDescription}
          </CustomText>
        ) : null}

        <PaperInput
          label="Peso em kg *"
          placeholder="70"
          value={values.donatorDetails.weightKilo?.toString() ?? ""}
          onChange={handleChange("donatorDetails.weightKilo")}
          mt={5}
          keyboardType="numeric"
        />
        {touched.donatorDetails?.weightKilo &&
        errors.donatorDetails?.weightKilo ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.weightKilo}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Masculino", "Feminino"]}
          onValueChange={handleChange("donatorDetails.gender")}
          title="Qual o seu gênero? *"
        />
        {touched.donatorDetails?.gender && errors.donatorDetails?.gender ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.gender}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Heterossexual", "Homossexual"]}
          onValueChange={handleChange("donatorDetails.orientation")}
          title="Qual a sua orientação sexual? *"
        />
        {touched.donatorDetails?.orientation &&
        errors.donatorDetails?.orientation ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.orientation}
          </CustomText>
        ) : null}

        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpHealthDonator;

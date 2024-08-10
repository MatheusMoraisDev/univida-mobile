import React from "react";
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";
import PaperInput from "@/src/components/atoms/paperInput";
import Steps from "@/src/components/molecules/steps";

const signUpAddressDonator = () => {
  const {
    values,
    touched,
    errors,
    handleChange,
    validateForm,
    setErrors,
    setTouched,
  } = useFormikContext<IDonator>();
  const router = useRouter();

  const errorsAny = errors as any;

  const isFieldValid = (fieldPath: string): boolean => {
    const [arrayName, indexStr, fieldName] = fieldPath
      .split(/[\[\].]+/)
      .filter(Boolean);
    const index = parseInt(indexStr, 10);

    if (arrayName && fieldName && !isNaN(index)) {
      return (
        (values[arrayName as keyof IDonator] as any)?.[index]?.[fieldName] &&
        !(errors[arrayName as keyof IDonator] as any)?.[index]?.[fieldName]
      );
    }

    const [parent, child] = fieldPath.split(".") as [
      keyof IDonator,
      keyof IDonator["user"],
    ];
    if (child) {
      return (
        (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child]
      );
    }

    return false;
  };

  const isCurrentStepValid = (): boolean => {
    const requiredFields = ["contacts[0].contact", "user.email"];

    if (values.contacts?.[0]?.emergency_contact) {
      requiredFields.push("contacts[0].emergency_contact_name");
      requiredFields.push("contacts[0].emergency_contact");
    }

    return requiredFields.every(isFieldValid);
  };

  const handleNavigate = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        router.push("signUpDonator/fifthStep");
      } else {
        setTouched({
          contacts: [
            {
              contact: true,
              emergency_contact: true,
              emergency_contact_name: true,
            },
          ],
          user: {
            email: true,
          },
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={4} totalSteps={5} />
        <PaperInput
          keyboardType="phone-pad"
          mask="phone"
          maxLenght={15}
          label="Telefone *"
          placeholder="(11)99999-9999"
          value={values.contacts?.[0]?.contact ?? ""}
          onChange={handleChange("contacts[0].contact")}
          mt={10}
        />
        {touched.contacts?.[0]?.contact && errorsAny.contacts?.[0]?.contact ? (
          <CustomText size={10} color="primary">
            {(errorsAny.contacts[0] as any).contact}
          </CustomText>
        ) : null}

        <PaperInput
          label="E-mail *"
          keyboardType="email-address"
          placeholder="email@email.com"
          value={values.user?.email ?? ""}
          onChange={handleChange("user.email")}
          mt={5}
        />
        {touched.user?.email && errors.user?.email ? (
          <CustomText size={10} color="primary">
            {errors.user.email}
          </CustomText>
        ) : null}

        <PaperInput
          label="Nome do contato de emergência"
          placeholder="Nome do Contato para emergência"
          value={values.contacts?.[0]?.emergency_contact_name ?? ""}
          onChange={handleChange("contacts[0].emergency_contact_name")}
          mt={5}
        />
        {touched.contacts?.[0]?.emergency_contact_name &&
        errorsAny.contacts?.[0]?.emergency_contact_name ? (
          <CustomText size={10} color="primary">
            {(errorsAny.contacts[0] as any).emergency_contact_name}
          </CustomText>
        ) : null}

        <PaperInput
          keyboardType="phone-pad"
          mask="phone"
          maxLenght={15}
          label="Contato de emergência"
          placeholder="(11)99999-9999"
          value={values.contacts?.[0]?.emergency_contact ?? ""}
          onChange={handleChange("contacts[0].emergency_contact")}
          mt={5}
        />
        {touched.contacts?.[0]?.emergency_contact &&
        errorsAny.contacts?.[0]?.emergency_contact ? (
          <CustomText size={10} color="primary">
            {(errorsAny.contacts[0] as any).emergency_contact}
          </CustomText>
        ) : null}

        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpAddressDonator;

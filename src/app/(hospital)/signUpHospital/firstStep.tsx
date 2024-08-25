import React from "react";
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IHospital } from "@/src/interfaces/hospital.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";
import PaperInput from "@/src/components/atoms/paperInput";
import Steps from "@/src/components/molecules/steps";
import CustomRadioButton from "@/src/components/atoms/radioButton";
import { hospitalService } from "@/src/services/hospitalService";
import Toast from "react-native-toast-message";

const signUpHospitalData = () => {
  const {
    values,
    touched,
    errors,
    handleChange,
    validateForm,
    setErrors,
    setTouched,
    setFieldValue,
  } = useFormikContext<IHospital>();
  const router = useRouter();

  const isCurrentStepValid = (): boolean => {
    const requiredFields: Array<
      keyof IHospital | "user.password" | "user.confirmPassword"
    > = ["name", "cnpj", "hospitalType"];

    return requiredFields.every((field) => {
      const [parent, child] = field.split(".") as [
        keyof IHospital,
        keyof IHospital["user"],
      ];
      if (child) {
        return (
          (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child]
        );
      }
      return (
        values[field as keyof IHospital] && !errors[field as keyof IHospital]
      );
    });
  };

  const handleNavigate = () => {
    validateForm().then(async (errors) => {
      if (isCurrentStepValid()) {
        const hospital = await hospitalService.getHospital({
          cnpj: values.cnpj,
        });

        if (hospital.items.length > 0) {
          router.push("/");
          Toast.show({
            type: "error",
            text1: "Usuário já cadastrado",
            text2: "Redirecionado para a tela de login",
            visibilityTime: 4000,
          });
          return;
        }
        router.push("signUpHospital/secondStep");
      } else {
        setTouched({
          name: true,
          cnpj: true,
          hospitalType: true,
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={1} totalSteps={4} />
        <CustomRadioButton
          initialValue="Não"
          options={["Público", "Privado"]}
          onValueChange={(value: any) => {
            setFieldValue("hospitalType", value);
          }}
          title="Selecione o tipo do hospital *"
        />
        {touched.hospitalType && errors.hospitalType ? (
          <CustomText size={10} color="primary">
            {errors.hospitalType}
          </CustomText>
        ) : null}
        <PaperInput
          label="Nome do hospital*"
          placeholder="Digite o nome do hospital"
          value={values.name}
          onChange={handleChange("name")}
          hasError={!!errors.name && touched.name}
        />
        {touched.name && errors.name ? (
          <CustomText size={10} color="primary" align="right">
            {errors.name}
          </CustomText>
        ) : null}
        <PaperInput
          label="CNPJ *"
          maxLenght={14}
          mask="cnpj"
          placeholder="Digite o CNPJ do hospital"
          value={values.cnpj}
          onChange={handleChange("cnpj")}
          keyboardType="numeric"
          mt={10}
          hasError={!!errors.cnpj && touched.cnpj}
        />
        {touched.cnpj && errors.cnpj ? (
          <CustomText size={10} color="primary">
            {errors.cnpj}
          </CustomText>
        ) : null}
        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpHospitalData;

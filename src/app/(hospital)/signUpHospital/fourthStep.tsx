import React, { useContext } from "react";
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IHospital } from "@/src/interfaces/hospital.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from "react-native";
import PaperInput from "@/src/components/atoms/paperInput";
import Steps from "@/src/components/molecules/steps";
import { userService } from "@/src/services/userService";
import { IUser } from "@/src/interfaces/user.interface";
import { hospitalService } from "@/src/services/hospitalService";
import { UserContext } from "@/src/contexts/userContext";
import Toast from "react-native-toast-message";

const signUpContactHospital = () => {
  const {
    values,
    touched,
    errors,
    handleChange,
    validateForm,
    setErrors,
    setTouched,
  } = useFormikContext<IHospital>();
  const { dispatch } = useContext(UserContext);

  const router = useRouter();

  const errorsAny = errors as any;

  const isFieldValid = (fieldPath: string): boolean => {
    const [arrayName, indexStr, fieldName] = fieldPath
      .split(/[\[\].]+/)
      .filter(Boolean);
    const index = parseInt(indexStr, 10);

    if (arrayName && fieldName && !isNaN(index)) {
      return (
        (values[arrayName as keyof IHospital] as any)?.[index]?.[fieldName] &&
        !(errors[arrayName as keyof IHospital] as any)?.[index]?.[fieldName]
      );
    }

    const [parent, child] = fieldPath.split(".") as [
      keyof IHospital,
      keyof IHospital["user"],
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

    return requiredFields.every(isFieldValid);
  };

  const createUser = async () => {
    try {
      const user: IUser = {
        ...values.user,
        type: "pj",
      };

      delete user.confirmPassword;

      return await userService.createUser(user);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao criar usuário.",
        text2: "Entre em contato com a administração.",
      });
      return null;
    }
  };

  const createHospital = async (user: IUser) => {
    try {
      return await hospitalService.createHospital({ ...values, user: user });
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao criar hospital.",
        text2: "Entre em contato com a administração.",
      });
      return null;
    }
  };

  const onSubmitForm = async () => {
    const user = await createUser();
    if (!user) return;

    const hospital = await createHospital(user);
    if (!hospital) return;

    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        id: user.id,
        email: user.email,
        firstName: hospital.name,
        lastName: "",
      },
    });

    dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });

    router.push("validateEmail");
  };

  const handleFinish = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        onSubmitForm();
      } else {
        setTouched({
          contacts: [{ contact: true }],
          user: { email: true },
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={4} totalSteps={4} />
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

        <Button title="Finalizar" onPress={handleFinish} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpContactHospital;

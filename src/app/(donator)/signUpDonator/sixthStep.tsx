import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import PaperInput from "@/src/components/atoms/paperInput";
import CustomRadioButton from "@/src/components/atoms/radioButton";
import CustomText from "@/src/components/atoms/text";
import Steps from "@/src/components/molecules/steps";
import { UserContext } from "@/src/contexts/userContext";
import { IDonator } from "@/src/interfaces/donator.interface";
import { IUser } from "@/src/interfaces/user.interface";
import { donatorService } from "@/src/services/donatorService";
import { userService } from "@/src/services/userService";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { useContext } from "react";
import { KeyboardAvoidingView } from "react-native";
import Toast from "react-native-toast-message";

const signUpHealthDonatorSecondPart = () => {
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
  const { dispatch } = useContext(UserContext);

  const router = useRouter();

  const isCurrentStepValid = (): boolean => {
    const requiredFields: Array<string> = [
      "donatorDetails.hasActiveSexLife",
      "donatorDetails.hasTattoo",
      "donatorDetails.usedDrugs",
    ];

    if (values.donatorDetails.hasActiveSexLife) {
      requiredFields.push("donatorDetails.hasCasualActiveSexLife");
    }

    if (values.donatorDetails.hasTattoo) {
      requiredFields.push("donatorDetails.tattooQuantity");
    }

    if (values.donatorDetails.usedDrugs) {
      requiredFields.push("donatorDetails.drugDescription");
    }

    return requiredFields.every((field) => {
      const [parent, child] = field.split(".") as [
        keyof IDonator,
        keyof IDonator["user"],
      ];
      if (child) {
        if (field === "donatorDetails.hasActiveSexLife") {
          return !(errors[parent] as any)?.[child];
        }
        if (field === "donatorDetails.hasTattoo") {
          return !(errors[parent] as any)?.[child];
        }
        if (field === "donatorDetails.usedDrugs") {
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

  const handleFinish = () => {
    validateForm().then((errors) => {
      if (isCurrentStepValid()) {
        onSubmitForm();
      } else {
        setTouched({
          donatorDetails: {
            hasActiveSexLife: true,
            hasCasualActiveSexLife: true,
            hasTattoo: true,
            tattooQuantity: true,
            usedDrugs: true,
            drugDescription: true,
          },
        });
        setErrors(errors);
      }
    });
  };

  const createUser = async () => {
    try {
      const user: IUser = {
        ...values.user,
        type: "pf",
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

  const createDonator = async (user: IUser) => {
    try {
      const [day, month, year] = values.birthDate.split("/");
      const birthDate = new Date(`${year}-${month}-${day}`).toISOString();

      return await donatorService.createDonator({
        ...values,
        birthDate: birthDate,
        user: user,
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao criar doador.",
        text2: "Entre em contato com a administração.",
      });
      return null;
    }
  };

  const onSubmitForm = async () => {
    const user = await createUser();
    if (!user) return;

    const donator = await createDonator(user);
    if (!donator) return;

    if (donator.donatorDetails.weightKilo < 50) {
      router.replace("signUpDonator/blockedRegister");
      return;
    }

    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        id: user.id,
        email: user.email,
        firstName: donator.firstName,
        lastName: donator.lastName,
        referenceId: donator.id,
      },
    });

    dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });

    router.replace("validateEmail");
  };

  return (
    <KeyboardAvoidingView enabled={true}>
      <Container justify="flex-start" align="center" pd={0}>
        <Steps currentStep={6} totalSteps={6} />
        <CustomRadioButton
          initialValue="Não"
          options={["Sim", "Não"]}
          onValueChange={(value: any) => {
            setFieldValue("donatorDetails.hasActiveSexLife", value === "Sim");
          }}
          title="Possui vida sexual ativa? *"
        />
        {touched.donatorDetails?.hasActiveSexLife &&
        errors.donatorDetails?.hasActiveSexLife ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hasActiveSexLife}
          </CustomText>
        ) : null}

        {values.donatorDetails.hasActiveSexLife && (
          <CustomRadioButton
            initialValue="Não"
            options={["Sim", "Não"]}
            onValueChange={(value: any) => {
              setFieldValue(
                "donatorDetails.hasCasualActiveSexLife",
                value === "Sim",
              );
            }}
            title="Possui vida sexual casual? *"
          />
        )}
        {values.donatorDetails.hasActiveSexLife &&
        touched.donatorDetails?.hasCasualActiveSexLife &&
        errors.donatorDetails?.hasCasualActiveSexLife ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hasCasualActiveSexLife}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Sim", "Não"]}
          onValueChange={(value: any) => {
            setFieldValue("donatorDetails.hasTattoo", value === "Sim");
          }}
          title="Possui tatuagem? *"
        />
        {touched.donatorDetails?.hasTattoo &&
        errors.donatorDetails?.hasTattoo ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hasTattoo}
          </CustomText>
        ) : null}

        {values.donatorDetails.hasTattoo && (
          <PaperInput
            label="Quantas tatuagens possui? *"
            placeholder="Quantidade de tatuagens"
            value={values.donatorDetails.tattooQuantity.toString() ?? ""}
            onChange={handleChange("donatorDetails.tattooQuantity")}
            mask="number"
            keyboardType="numeric"
            mt={5}
          />
        )}
        {values.donatorDetails.hasTattoo &&
        touched.donatorDetails?.tattooQuantity &&
        errors.donatorDetails?.tattooQuantity ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.tattooQuantity}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Sim", "Não"]}
          onValueChange={(value: any) => {
            setFieldValue("donatorDetails.usedDrugs", value === "Sim");
          }}
          title="Já usou drogas? *"
        />
        {touched.donatorDetails?.usedDrugs &&
        errors.donatorDetails?.usedDrugs ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.usedDrugs}
          </CustomText>
        ) : null}

        {values.donatorDetails.usedDrugs && (
          <PaperInput
            label="Qual(is) droga(s) você já usou? *"
            placeholder="Descreva as drogas que utilizou."
            value={values.donatorDetails.drugDescription || ""}
            onChange={handleChange("donatorDetails.drugDescription")}
            keyboardType="default"
            mt={5}
          />
        )}
        {values.donatorDetails.hasTattoo &&
        touched.donatorDetails?.tattooQuantity &&
        errors.donatorDetails?.tattooQuantity ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.tattooQuantity}
          </CustomText>
        ) : null}

        <Button title="Finalizar" onPress={handleFinish} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpHealthDonatorSecondPart;

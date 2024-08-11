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
import showToastError from "@/src/utils/toast";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { useContext } from "react";
import { KeyboardAvoidingView } from "react-native";

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
      "donatorDetails.hasTatoos",
      "donatorDetails.hadUseDrugs",
    ];

    if (values.donatorDetails.hasActiveSexLife) {
      requiredFields.push("donatorDetails.casualActiveSexLife");
    }

    if (values.donatorDetails.hasTatoos) {
      requiredFields.push("donatorDetails.tatooDescription");
    }

    if (values.donatorDetails.hadUseDrugs) {
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
        if (field === "donatorDetails.hasTatoos") {
          return !(errors[parent] as any)?.[child];
        }
        if (field === "donatorDetails.hadUseDrugs") {
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
            hasTatoos: true,
            tatooQuantity: true,
            hadUseDrugs: true,
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
      showToastError(
        "Erro ao criar usuário. Entre em contato com a administração.",
      );
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
      showToastError(
        "Erro ao criar doador. Entre em contato com a administração.",
      );
      return null;
    }
  };

  const onSubmitForm = async () => {
    const user = await createUser();
    if (!user) return;

    const donator = await createDonator(user);
    if (!donator) return;

    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        id: user.id,
        email: user.email,
        firstName: donator.firstName,
        lastName: donator.lastName,
      },
    });

    dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });

    router.push("validateEmail");
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
            setFieldValue("donatorDetails.hasTatoos", value === "Sim");
          }}
          title="Possui tatuagem? *"
        />
        {touched.donatorDetails?.hasTatoos &&
        errors.donatorDetails?.hasTatoos ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hasTatoos}
          </CustomText>
        ) : null}

        {values.donatorDetails.hasTatoos && (
          <PaperInput
            label="Quantas tatuagens possui? *"
            placeholder="Quantidade de tatuagens"
            value={values.donatorDetails.tatooQuantity.toString() ?? ""}
            onChange={handleChange("donatorDetails.tatooQuantity")}
            mask="number"
            keyboardType="numeric"
            mt={5}
          />
        )}
        {values.donatorDetails.hasTatoos &&
        touched.donatorDetails?.tatooQuantity &&
        errors.donatorDetails?.tatooQuantity ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.tatooQuantity}
          </CustomText>
        ) : null}

        <CustomRadioButton
          initialValue="Não"
          options={["Sim", "Não"]}
          onValueChange={(value: any) => {
            setFieldValue("donatorDetails.hadUseDrugs", value === "Sim");
          }}
          title="Já usou drogas? *"
        />
        {touched.donatorDetails?.hadUseDrugs &&
        errors.donatorDetails?.hadUseDrugs ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.hadUseDrugs}
          </CustomText>
        ) : null}

        {values.donatorDetails.hadUseDrugs && (
          <PaperInput
            label="Qual(is) droga(s) você já usou? *"
            placeholder="Descreva as drogas que utilizou."
            value={values.donatorDetails.drugDescription || ""}
            onChange={handleChange("donatorDetails.drugDescription")}
            keyboardType="default"
            mt={5}
          />
        )}
        {values.donatorDetails.hasTatoos &&
        touched.donatorDetails?.tatooQuantity &&
        errors.donatorDetails?.tatooQuantity ? (
          <CustomText size={10} color="primary">
            {errors.donatorDetails.tatooQuantity}
          </CustomText>
        ) : null}

        <Button title="Finalizar" onPress={handleFinish} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpHealthDonatorSecondPart;

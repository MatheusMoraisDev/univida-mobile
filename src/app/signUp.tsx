import React from "react";
import { Logo } from "../components/atoms/logo";
import CustomText from "../components/atoms/text";
import { Button } from "../components/atoms/button";
import { Container } from "../components/atoms/container";
import ForwardOrBackButton from "../components/atoms/forwardOrBackButton";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.canGoBack() ? router.back() : router.push("/");
  };

  const handleSignUpHospital = () => {
    router.push("signUpHospital");
  };

  const handleSignUpDonator = () => {
    router.push("signUpDonator");
  };

  return (
    <Container align="center">
      <Logo size="medium" />
      <CustomText mt={60} font={"regular"} size={24}>
        Cadastro
      </CustomText>
      <Button title="Doador" mt={60} onPress={handleSignUpDonator} />
      <Button title="Hospital" mt={20} onPress={handleSignUpHospital} />
      <ForwardOrBackButton back onPress={handleReturn} />
    </Container>
  );
};

export default SignUp;

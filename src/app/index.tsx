import { useContext, useEffect, useState } from "react";
import { Container } from "../components/atoms/container";
import { Logo } from "../components/atoms/logo";
import { Button } from "../components/atoms/button";
import { FirstAccessStyles } from "../styles/screens/loginStyles";
import CustomText from "../components/atoms/text";
import { Link, useRouter } from "expo-router";
import { authService, ILoginResponse } from "../services/authService";
import { UserContext } from "../contexts/userContext";
import PaperInput from "../components/atoms/paperInput";
import { donatorService } from "../services/donatorService";
import { hospitalService } from "../services/hospitalService";
import Toast from "react-native-toast-message";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const handleDonatorSignIn = async (token: ILoginResponse) => {
    const donatorResponse = await donatorService.getDonator({
      userId: token.user.id,
    });

    if (donatorResponse.items.length > 1) {
      Toast.show({
        type: "error",
        text1: "Ocorreu um problema ao iniciar sessão.",
        text2: "Por favor, entre em contato com o suporte.",
      });
      return;
    }

    const donator = donatorResponse.items[0];

    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        id: token.user.id,
        email: token.user.email,
        firstName: donator.firstName,
        lastName: donator.lastName,
      },
    });

    dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
    return router.replace("donatorPanel");
  };

  const handleHospitalSignIn = async (token: ILoginResponse) => {
    const hospitalResponse = await hospitalService.getHospital({
      userId: token.user.id,
    });

    if (hospitalResponse.items.length > 1) {
      Toast.show({
        type: "error",
        text1: "Ocorreu um problema ao iniciar sessão.",
        text2: "Por favor, entre em contato com o suporte.",
      });
      return;
    }

    const hospital = hospitalResponse.items[0];

    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        id: token.user.id,
        email: token.user.email,
        firstName: hospital.name,
        lastName: "",
      },
    });

    dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
    return router.replace("hospitalPanel");
  };

  const signIn = async () => {
    try {
      const token = await authService.signIn({ email, password });
      setMessageError("");

      if (token.user.type === "pf") {
        return await handleDonatorSignIn(token);
      }

      if (token.user.type === "pj") {
        return await handleHospitalSignIn(token);
      }
    } catch {
      setMessageError("E-mail ou senha inválidos.");
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    if (!email || !password) {
      return "Por favor, preencha todos os campos.";
    }

    if (!validateEmail(email)) {
      return "Por favor, insira um e-mail válido.";
    }

    return "";
  };

  const handleSignIn = () => {
    const message = validateForm();

    if (message) {
      return setMessageError(message);
    }
    signIn();
  };

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      router.push("donatorPanel");
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <Container align="center">
      <Logo size="medium" />
      <PaperInput
        label="E-mail"
        mt={50}
        onChange={setEmail}
        value={email}
        placeholder="email@email.com"
        keyboardType="email-address"
      />
      <PaperInput
        label="Senha"
        onChange={setPassword}
        value={password}
        placeholder="Insira a sua senha"
        keyboardType="default"
        secure
      />
      <CustomText size={12} color={"primary"} mt={12}>
        {!!messageError && messageError}
      </CustomText>
      <Button title="Entrar" mt={60} onPress={handleSignIn} />
      <FirstAccessStyles>
        <CustomText size={14}>Primeiro acesso?</CustomText>
        <CustomText size={14} color={"primary"}>
          <Link href={"signUp"}> Acesse aqui</Link>
        </CustomText>
      </FirstAccessStyles>
    </Container>
  );
}

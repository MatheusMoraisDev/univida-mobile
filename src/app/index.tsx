import { useEffect, useState } from "react";
import { Container } from "../components/atoms/container";
import { Logo } from "../components/atoms/logo";
import { CustomTextInput } from "../components/atoms/textInput";
import { Button } from "../components/atoms/button";
import { FirstAccessStyles } from "../styles/screens/loginStyles";
import CustomText from "../components/atoms/text";
import { Link, useRouter } from "expo-router";
import { authService } from "../services/authService";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const router = useRouter();

  const signIn = async () => {
    try {
      await authService.signIn({ email, password });
      setMessageError('');
      return router.push('donatorPanel')
    } catch (error) {
      setMessageError('E-mail ou senha inválidos.');
    }
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    if (!email || !password) {
      return 'Por favor, preencha todos os campos.';
    } 
    
    if (!validateEmail(email)) {
      return 'Por favor, insira um e-mail válido.';
    }

    return '';
  }

  const handleSignIn = () => {
    
    const message = validateForm();

    if (message) {
      return setMessageError(message);
    }
    signIn();
  };

  // useEffect(() => {
  //   const delay = 1000;
  //   const timeoutId = setTimeout(() => {
  //     router.push('validationEmail');
  //   }, delay);
  //   return () => clearTimeout(timeoutId);
  // }, [router]);


  return (
    <Container align="center">
    <Logo size="medium" />
    <CustomTextInput placeholder="Digite o seu e-mail" mt={50} onChange={setEmail}/>
    <CustomTextInput placeholder="Digite sua senha" mt={20} onChange={setPassword} secure />
    <CustomText size={12} color={'primary'} mt={12}>{ !!messageError && messageError }</CustomText>
    <Button title="Entrar" mt={60} onPress={handleSignIn}/>
    <FirstAccessStyles>
      <CustomText size={14}>Primeiro acesso?</CustomText>
      <CustomText size={14} color={"primary"}><Link href={"signUp"}> Acesse aqui</Link></CustomText>
    </FirstAccessStyles>
  </Container>
  );
}
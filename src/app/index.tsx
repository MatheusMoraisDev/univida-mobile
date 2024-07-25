import { useContext, useEffect, useState } from "react";
import { Container } from "../components/atoms/container";
import { Logo } from "../components/atoms/logo";
import { CustomTextInput } from "../components/atoms/textInput";
import { Button } from "../components/atoms/button";
import { FirstAccessStyles } from "../styles/screens/loginStyles";
import CustomText from "../components/atoms/text";
import { Link, useRouter } from "expo-router";
import { authService } from "../services/authService";
import { UserContext } from "../contexts/userContext";
import PaperInput from "../components/atoms/paperInput";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const { state, dispatch } = useContext(UserContext);
  const router = useRouter();

  const signIn = async () => {
    try {
      const user = await authService.signIn({ email, password });
      setMessageError('');
      dispatch({ type: 'SET_CURRENT_USER', payload: { 
        id: user.user.id,
        email: email, 
        firstName: user.user.firstName,
        lastName: user.user.lastName,
       } });
       dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true });
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
    <PaperInput  label="E-mail" mt={50} onChange={setEmail} value={email} placeholder="email@email.com" keyboardType="email-address" />
    <PaperInput label="Senha" onChange={setPassword} value={password} placeholder="Insira a sua senha" keyboardType="default" secure />
    <CustomText size={12} color={'primary'} mt={12}>{ !!messageError && messageError }</CustomText>
    <Button title="Entrar" mt={60} onPress={handleSignIn}/>
    <FirstAccessStyles>
      <CustomText size={14}>Primeiro acesso?</CustomText>
      <CustomText size={14} color={"primary"}><Link href={"signUp"}> Acesse aqui</Link></CustomText>
    </FirstAccessStyles>
  </Container>
  );
}
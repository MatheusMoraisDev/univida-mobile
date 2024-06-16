// validationEmail.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { Container } from '../components/atoms/container';
import { Logo } from '../components/atoms/logo';
import ForwardOrBackButton from '../components/atoms/forwardOrBackButton';
import CustomText from '../components/atoms/text';
import OtpInput from '../components/molecules/otpInput';
import { notificationService } from '../services/notificationService';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ValidationEmail = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(20);
  const [sendAgain, setSendAgain] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const user = params.user;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    notificationService.sendEmail({ email: user.email });

    return () => clearInterval(countdown);
  }, [sendAgain]);

  const handleValidation = async () => {
    try {
      await notificationService.validateEmail({ validationCode: code, user: user });
      router.push('donatorPanel');
    } catch (error) {
      console.error('Error validating code', error);
      Alert.alert('Erro', 'Ocorreu um erro ao validar o código. Tente novamente.');
    }
  };

  const handleSendAgain = () => {
      setSendAgain(!sendAgain);
      setTimer(60);
  }

  const handleChangeOtp = (value: string) => {
    setCode(value);
    console.log(code);
  };

  return (
    <Container justify='center' align='center'>
      <Logo size='medium' mt={40}/>
      <CustomText mt={60} size={14} align="center">
        Insira no campo abaixo o código de 5 (cinco) dígitos enviado para o e-mail cadastrado.
      </CustomText>
      <OtpInput length={5} mt={20} onChangeOtp={handleChangeOtp}/>
      <ForwardOrBackButton mt={75} onPress={handleValidation}/>
      <CustomText size={14}>Não recebeu?</CustomText>
      {timer === 0 ? (
        <CustomText size={14} color="primary" onPress={handleSendAgain}>
            Enviar novamente
        </CustomText>
      ) : (
        <CustomText size={14} color="primary">
          Enviar novamente em {timer}s
        </CustomText>
      )}
    </Container>
  );
};

export default ValidationEmail;


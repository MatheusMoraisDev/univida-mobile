import React from 'react';
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView, View } from 'react-native';
import PaperInput from '@/src/components/atoms/paperInput';

const signUpDonatorData = () => {
  const { values, touched, errors, handleBlur, handleChange } = useFormikContext<IDonator>();
  const router = useRouter();

  const isCurrentStepValid = (): boolean => {
    const requiredFields: Array<keyof IDonator | 'user.password' | 'user.confirmPassword'> = [
      'firstName', 
      'lastName', 
      'cpf', 
      'rg', 
      'birthDate', 
    ];
  
    return requiredFields.every((field) => {
      const [parent, child] = field.split('.') as [keyof IDonator, keyof IDonator['user']];
      if (child) {
        return (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child];
      }
      return values[field as keyof IDonator] && !errors[field as keyof IDonator];
    });
  };

  const handleNavigate = () => {
    if (isCurrentStepValid()) {
      router.push('signUpDonator/signUpPassword');
    }
  };

  return (
    <KeyboardAvoidingView>
      <Container justify='center' align='center' pd={0}>
        <PaperInput
          label='Nome'
          placeholder='Digite o seu primeiro nome'
          onBlur={handleBlur('firstName')}
          value={values.firstName}
          onChange={handleChange('firstName')}
        />
        {touched.firstName && errors.firstName ? (
          <CustomText size={10} color="primary" align='right'>{errors.firstName}</CustomText>
        ) : null}
        <PaperInput
          label='Sobrenome'
          placeholder='Digite o seu último nome'
          value={values.lastName}
          onChange={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          mt={10}
        />
        {touched.lastName && errors.lastName ? (
          <CustomText size={10} color="primary">{errors.lastName}</CustomText>
        ) : null}
        <PaperInput
          label='CPF'
          placeholder='Digite o seu CPF'
          value={values.cpf}
          onBlur={handleBlur('cpf')}
          onChange={handleChange('cpf')}
          mt={10}
        />
        {touched.cpf && errors.cpf ? (
          <CustomText size={10} color="primary">{errors.cpf}</CustomText>
        ) : null}
        <PaperInput
          label='RG'
          placeholder='Digite o seu RG'
          value={values.rg}
          onBlur={handleBlur('rg')}
          onChange={handleChange('rg')}
          mt={10}
        />
        {touched.rg && errors.rg ? (
          <CustomText size={10} color="primary">{errors.rg}</CustomText>
        ) : null}
        <PaperInput
          label='Data de nascimento'
          placeholder='Digite a sua data de nascimento'
          value={values.birthDate}
          onBlur={handleBlur('birthDate')}
          onChange={handleChange('birthDate')}
          mt={10}
        />
        {touched.birthDate && errors.birthDate ? (
          <CustomText size={10} color="primary">{errors.birthDate}</CustomText>
        ) : null}
        <Button title="Prosseguir" onPress={handleNavigate} disabled={!isCurrentStepValid()} bottomButton/>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpDonatorData;

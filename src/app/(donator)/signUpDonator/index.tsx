import React from 'react';
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from 'react-native';
import PaperInput from '@/src/components/atoms/paperInput';
import Steps from '@/src/components/molecules/steps';

const signUpDonatorData = () => {
  const { values, touched, errors, handleChange, validateForm, setErrors, setTouched } = useFormikContext<IDonator>();
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
    validateForm().then(errors => {
      if (isCurrentStepValid()){
        router.push('signUpDonator/signUpPassword');
      } else {
        setTouched({
          firstName: true,
          lastName: true,
          cpf: true,
          rg: true,
          birthDate: true,
        });
        setErrors(errors);
      }
    });
  };

  return (
    <KeyboardAvoidingView>
      <Container justify='flex-start' align='center' pd={0}>
        <Steps currentStep={1} totalSteps={5}/>
        <PaperInput
          label='Nome *'
          placeholder='Digite o seu primeiro nome'
          value={values.firstName}
          onChange={handleChange('firstName')}
          hasError={!!errors.firstName && touched.firstName}
        />
        {touched.firstName && errors.firstName ? (
          <CustomText size={10} color="primary" align='right'>{errors.firstName}</CustomText>
        ) : null}
        <PaperInput
          label='Sobrenome *'
          placeholder='Digite o seu último nome'
          value={values.lastName}
          onChange={handleChange('lastName')}
          mt={10}
          hasError={!!errors.lastName && touched.lastName}
        />
        {touched.lastName && errors.lastName ? (
          <CustomText size={10} color="primary">{errors.lastName}</CustomText>
        ) : null}
        <PaperInput
          label='CPF *'
          maxLenght={14}
          mask='cpf'
          placeholder='Digite o seu CPF'
          value={values.cpf}
          onChange={handleChange('cpf')}
          keyboardType='numeric'
          mt={10}
          hasError={!!errors.cpf && touched.cpf}
        />
        {touched.cpf && errors.cpf ? (
          <CustomText size={10} color="primary">{errors.cpf}</CustomText>
        ) : null}
        <PaperInput
          label='RG *'
          maxLenght={12}
          mask='rg'
          placeholder='Digite o seu RG'
          value={values.rg}
          onChange={handleChange('rg')}
          keyboardType='numeric'
          mt={10}
          hasError={!!errors.rg && touched.rg}
        />
        {touched.rg && errors.rg ? (
          <CustomText size={10} color="primary">{errors.rg}</CustomText>
        ) : null}
        <PaperInput
          label='Data de nascimento *'
          maxLenght={10}
          mask='date'
          placeholder='Digite a sua data de nascimento'
          value={values.birthDate}
          onChange={handleChange('birthDate')}
          mt={10}
          keyboardType='numeric'
          hasError={!!errors.birthDate && touched.birthDate}
        />
        {touched.birthDate && errors.birthDate ? (
          <CustomText size={10} color="primary">{errors.birthDate}</CustomText>
        ) : null}
        <Button title="Prosseguir" onPress={handleNavigate} bottomButton />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpDonatorData;

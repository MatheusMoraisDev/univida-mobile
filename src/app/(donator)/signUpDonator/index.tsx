import React from 'react';
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

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
      'user.password', 
      'user.confirmPassword'
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
      router.push('signUpDonator/signUpAddress');
    }
  };

  return (
    <Container justify='center' align='center'>
      <CustomText font='regular' size={24}>Dados Pessoais</CustomText>
      <CustomTextInput
        placeholder='Digite o seu primeiro nome'
        onBlur={handleBlur('firstName')}
        value={values.firstName}
        onChange={handleChange('firstName')}
        mt={20}
      />
      {touched.firstName && errors.firstName ? (
        <CustomText size={10} color="primary">{errors.firstName}</CustomText>
      ) : null}
      <CustomTextInput
        placeholder='Digite o seu último nome'
        value={values.lastName}
        onChange={handleChange('lastName')}
        onBlur={handleBlur('lastName')}
        mt={5}
      />
      {touched.lastName && errors.lastName ? (
        <CustomText size={10} color="primary">{errors.lastName}</CustomText>
      ) : null}
      <CustomTextInput
        placeholder='Digite o seu CPF'
        value={values.cpf}
        onBlur={handleBlur('cpf')}
        onChange={handleChange('cpf')}
        mt={5}
      />
      {touched.cpf && errors.cpf ? (
        <CustomText size={10} color="primary">{errors.cpf}</CustomText>
      ) : null}
      <CustomTextInput
        placeholder='Digite o seu RG'
        value={values.rg}
        onBlur={handleBlur('rg')}
        onChange={handleChange('rg')}
        mt={5}
      />
      {touched.rg && errors.rg ? (
        <CustomText size={10} color="primary">{errors.rg}</CustomText>
      ) : null}
      <CustomTextInput
        placeholder='Digite a sua data de nascimento'
        value={values.birthDate}
        onBlur={handleBlur('birthDate')}
        onChange={handleChange('birthDate')}
        mt={5}
      />
      {touched.birthDate && errors.birthDate ? (
        <CustomText size={10} color="primary">{errors.birthDate}</CustomText>
      ) : null}
     <CustomTextInput
        placeholder='Crie uma senha'
        value={values.user?.password || ''}
        onChange={handleChange('user.password')}
        onBlur={handleBlur('user.password')}
        mt={5}
        secure
      />
      {touched.user?.password && errors.user?.password ? (
        <CustomText size={10} color="primary">{errors.user.password}</CustomText>
      ) : null}
      <CustomTextInput
        placeholder='Confirme a sua senha'
        value={values.user?.confirmPassword || ''}
        onChange={handleChange('user.confirmPassword')}
        onBlur={handleBlur('user.confirmPassword')}
        mt={5}
        secure
      />
      {touched.user?.confirmPassword && errors.user?.confirmPassword ? (
        <CustomText size={10} color="primary">{errors.user.confirmPassword}</CustomText>
      ) : null}
      <Button title="Prosseguir" onPress={handleNavigate} disabled={!isCurrentStepValid()} />
    </Container>
  );
};

export default signUpDonatorData;

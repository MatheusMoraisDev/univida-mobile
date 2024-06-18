import React from 'react';
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import { KeyboardAvoidingView } from 'react-native';
import PaperInput from '@/src/components/atoms/paperInput';

const signUpAddressDonator = () => {
  const { values, touched, errors, handleBlur, handleChange } = useFormikContext<IDonator>();
  const router = useRouter();

  const errorsAny = errors as any;

  const isFieldValid = (fieldPath: string): boolean => {
    const [arrayName, indexStr, fieldName] = fieldPath.split(/[\[\].]+/).filter(Boolean);
    const index = parseInt(indexStr, 10);

    if (arrayName && fieldName && !isNaN(index)) {
      return (
        (values[arrayName as keyof IDonator] as any)?.[index]?.[fieldName] &&
        !(errors[arrayName as keyof IDonator] as any)?.[index]?.[fieldName]
      );
    }

    const [parent, child] = fieldPath.split('.') as [keyof IDonator, keyof IDonator['user']];
      if (child) {
        return (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child];
      }
      
    return false;
  };

  const isCurrentStepValid = (): boolean => {
    const requiredFields = [
      'user.password', 
      'user.confirmPassword'
    ];

    return requiredFields.every(isFieldValid);
  };

  const handleNavigate = () => {
    if (isCurrentStepValid()) {
      router.push('signUpDonator/signUpHealth');
    } else {
      console.log('Formulário não está válido');
    }
  };

  return (
    <KeyboardAvoidingView enabled={true}>
    <Container justify='center' align='center' pd={0}>
      <PaperInput
          label='Senha'
          placeholder='Crie uma senha'
          value={values.user?.password || ''}
          onChange={handleChange('user.password')}
          onBlur={handleBlur('user.password')}
          mt={20}
          secure
        />
      {touched.user?.password && errors.user?.password ? (
        <CustomText size={10} color="primary">{errors.user.password}</CustomText>
      ) : null}
      <PaperInput
        label='Confirme a sua senha'
        placeholder='Confirme a sua senha'
        value={values.user?.confirmPassword || ''}
        onChange={handleChange('user.confirmPassword')}
        onBlur={handleBlur('user.confirmPassword')}
        mt={20}
        secure
      />
      {touched.user?.confirmPassword && errors.user?.confirmPassword ? (
        <CustomText size={10} color="primary">{errors.user.confirmPassword}</CustomText>
      ) : null}

      <Button title="Prosseguir" onPress={handleNavigate} disabled={!isCurrentStepValid()} bottomButton/>
    </Container>
    </KeyboardAvoidingView>
  );
};

export default signUpAddressDonator;

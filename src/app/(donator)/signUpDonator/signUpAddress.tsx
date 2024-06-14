import React from 'react';
import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

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
      'addresses[0].state',
      'addresses[0].city',
      'addresses[0].neighborhood',
      'addresses[0].street',
      'addresses[0].zip',
      'contacts[0].contact',
      'contacts[0].emergency_contact_name',
      'user.email',
    ];

    if (values.contacts?.[0]?.emergency_contact) {
      requiredFields.push('contacts[0].emergency_contact');
    }

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
    <Container justify='center' align='center'>
      <CustomText align={"left"} font='regular' size={20}>Endereço</CustomText>
      <CustomTextInput
        placeholder='Digite o estado'
        value={values.addresses?.[0]?.state ?? ''}
        onChange={handleChange('addresses[0].state')}
        onBlur={handleBlur('addresses[0].state')}
        mt={20}
      />
      {touched.addresses?.[0]?.state && errorsAny.addresses?.[0]?.state ? (
        <CustomText size={10} color="primary">{(errorsAny.addresses[0] as any).state}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Digite a cidade'
        value={values.addresses?.[0]?.city ?? ''}
        onChange={handleChange('addresses[0].city')}
        onBlur={handleBlur('addresses[0].city')}
        mt={5}
      />
      {touched.addresses?.[0]?.city && errorsAny.addresses?.[0]?.city ? (
        <CustomText size={10} color="primary">{(errorsAny.addresses[0] as any).city}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Digite o bairro'
        value={values.addresses?.[0]?.neighborhood ?? ''}
        onChange={handleChange('addresses[0].neighborhood')}
        onBlur={handleBlur('addresses[0].neighborhood')}
        mt={5}
      />
      {touched.addresses?.[0]?.neighborhood && errorsAny.addresses?.[0]?.neighborhood ? (
        <CustomText size={10} color="primary">{(errorsAny.addresses[0] as any).neighborhood}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Digite o endereço'
        value={values.addresses?.[0]?.street ?? ''}
        onChange={handleChange('addresses[0].street')}
        onBlur={handleBlur('addresses[0].street')}
        mt={5}
      />
      {touched.addresses?.[0]?.street && errorsAny.addresses?.[0]?.street ? (
        <CustomText size={10} color="primary">{(errorsAny.addresses[0] as any).street}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Digite o CEP'
        value={values.addresses?.[0]?.zip ?? ''}
        onChange={handleChange('addresses[0].zip')}
        onBlur={handleBlur('addresses[0].zip')}
        mt={5}
      />
      {touched.addresses?.[0]?.zip && errorsAny.addresses?.[0]?.zip ? (
        <CustomText size={10} color="primary">{(errorsAny.addresses[0] as any).zip}</CustomText>
      ) : null}

      <CustomText align={"right"} font='regular' size={20} mt={20}>Contato</CustomText>

      <CustomTextInput
        placeholder='Digite o telefone com DDD'
        value={values.contacts?.[0]?.contact ?? ''}
        onChange={handleChange('contacts[0].contact')}
        onBlur={handleBlur('contacts[0].contact')}
        mt={10}
      />
      {touched.contacts?.[0]?.contact && errorsAny.contacts?.[0]?.contact ? (
        <CustomText size={10} color="primary">{(errorsAny.contacts[0] as any).contact}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Contato para emergência'
        value={values.contacts?.[0]?.emergency_contact ?? ''}
        onChange={handleChange('contacts[0].emergency_contact')}
        onBlur={handleBlur('contacts[0].emergency_contact')}
        mt={5}
      />
      {touched.contacts?.[0]?.emergency_contact && errorsAny.contacts?.[0]?.emergency_contact ? (
        <CustomText size={10} color="primary">{(errorsAny.contacts[0] as any).emergency_contact}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Nome do Contato para emergência'
        value={values.contacts?.[0]?.emergency_contact_name ?? ''}
        onChange={handleChange('contacts[0].emergency_contact_name')}
        onBlur={handleBlur('contacts[0].emergency_contact_name')}
        mt={5}
      />
      {touched.contacts?.[0]?.emergency_contact_name && errorsAny.contacts?.[0]?.emergency_contact_name ? (
        <CustomText size={10} color="primary">{(errorsAny.contacts[0] as any).emergency_contact_name}</CustomText>
      ) : null}

      <CustomTextInput
        placeholder='Digite o seu e-mail'
        value={values.user?.email ?? ''}
        onChange={handleChange('user.email')}
        onBlur={handleBlur('user.email')}
        mt={5}
      />
      {touched.user?.email && errors.user?.email ? (
        <CustomText size={10} color="primary">{errors.user.email}</CustomText>
      ) : null}

      <Button title="Prosseguir" onPress={handleNavigate} disabled={!isCurrentStepValid()} />
    </Container>
  );
};

export default signUpAddressDonator;

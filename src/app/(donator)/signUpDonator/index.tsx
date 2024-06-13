import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { Form, Formik, useFormikContext } from "formik";

const DonatorData = () => {
  const { values, setFieldValue } = useFormikContext<IDonator>();
  const router = useRouter();
  
  const handleNavigate = () => {
    router.push('signUpDonator/signUpAddress');
  };

  return (
    <Container justify='center' align='center'>
      <CustomText font='regular' size={24}>Dados Pessoais</CustomText>
      <CustomTextInput
        placeholder='Digite o seu primeiro nome'
        value={values.firstName}
        onChange={(text: string) => setFieldValue('firstName', text)}
        mt={20}
      />
      <CustomTextInput
        placeholder='Digite o seu último nome'
        value={values.lastName}
        onChange={(text: string) => setFieldValue('lastName', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite o seu CPF'
        value={values.cpf}
        onChange={(text: string) => setFieldValue('cpf', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite o seu RG'
        value={values.rg}
        onChange={(text: string) => setFieldValue('rg', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite a sua data de nascimento'
        value={values.birthDate}
        onChange={(text: string) => setFieldValue('birthDate', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Crie uma senha'
        value={values.user.password}
        onChange={(text: string) => setFieldValue('user.password', text)}
        mt={5}
        secure
      />
      <CustomTextInput
        placeholder='Confirme a sua senha'
        value={values.user.confirmPassword}
        onChange={(text: string) => setFieldValue('user.confirmPassword', text)}
        mt={5}
        secure
      />
      <Button title="Prosseguir" onPress={handleNavigate} />
    </Container>
  );
};

export default DonatorData;
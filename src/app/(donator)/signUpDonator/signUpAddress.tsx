import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

const DonatorData = () => {
  const { values, setFieldValue } = useFormikContext<IDonator>();
  const router = useRouter();
  
  const handleNavigate = () => {
    router.push('signUpDonator/signUpHealth');
  };

  return (
    <Container justify='center' align='center'>
      <CustomText align={"left"} font='regular' size={20}>Endereço</CustomText>
      <CustomTextInput
        placeholder='Digite o estado'
        value={values.addresses[0].state}
        onChange={(text: string) => setFieldValue('addresses[0].state', text)}
        mt={20}
      />
      <CustomTextInput
        placeholder='Digite a cidade'
        value={values.addresses[0].city}
        onChange={(text: string) => setFieldValue('addresses[0].city', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite o bairro'
        value={values.addresses[0].neighborhood}
        onChange={(text: string) => setFieldValue('addresses[0].neighborhood', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite o endereço'
        value={values.addresses[0].street}
        onChange={(text: string) => setFieldValue('addresses[0].street', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Digite o CEP'
        value={values.addresses[0].zip}
        onChange={(text: string) => setFieldValue('addresses[0].zip', text)}
        mt={5}
      />

      <CustomText align={"right"} font='regular' size={20} mt={20}>Contato</CustomText>

      <CustomTextInput
        placeholder='Digite o telefone com DDD'
        value={values.contacts[0].contact}
        onChange={(text: string) => setFieldValue('contacts[0].contact', text)}
        mt={10}
      />
      <CustomTextInput
        placeholder='Contato para emergência'
        value={values.contacts[0].emergency_contact}
        onChange={(text: string) => setFieldValue('contacts[0].emergency_contact', text)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Nome do Contato para emergência'
        value={values.contacts[0].emergency_contact_name}
        onChange={(text: string) => setFieldValue('contacts[0].emergency_contact_name', text)}
        mt={5}
      />
       <CustomTextInput
        placeholder='Digite o seu e-mail'
        value={values.user.email}
        onChange={(text: string) => setFieldValue('user.email', text)}
        mt={5}
      />
      <Button title="Prosseguir" onPress={handleNavigate} />
    </Container>
  );
};

export default DonatorData;

import { Button } from "@/src/components/atoms/button";
import Checkbox from "@/src/components/atoms/checkbox";
import { Container } from "@/src/components/atoms/container";
import CustomRadioButton from "@/src/components/atoms/radioButton";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

const DonatorData = () => {
  const { values, setFieldValue } = useFormikContext<IDonator>();
  const router = useRouter();
  
  const handleNavigate = () => {
    console.log(values);
  };

  const handleBooleanConvert = (value: string) => {
    const hasAllergy = value === 'Sim';
    setFieldValue('donatorDetails.hasAllergy', hasAllergy);
  };

  return (
    <Container justify='center' align='center'>
      <CustomText align={"left"} font='regular' size={20}>Saúde</CustomText>
      <CustomTextInput
        placeholder='Tipo sanguíneo'
        value={values.donatorDetails.bloodType}
        onChange={(value: string) => setFieldValue('donatorDetails.bloodType', value)}
        mt={20}
      />
      <CustomRadioButton 
          initialValue="Não" 
          options={["Sim", "Não"]} 
          onValueChange={handleBooleanConvert}
          title="Possui alergia?"
      />
      <CustomTextInput
        placeholder='Se sim, qual?'
        value={values.donatorDetails.allergyDescription || ''}
        onChange={(value: string) => setFieldValue('donatorDetails.allergyDescription', value)}
        mt={5}
      />
      <CustomTextInput
        placeholder='Peso em kg'
        value={values.donatorDetails.weightKilo}
        onChange={(value: number) => setFieldValue('donatorDetails.weightKilo', value)}
        mt={5}
      />
      <CustomRadioButton 
          initialValue="Não" 
          options={["Masculino", "Feminino"]} 
          onValueChange={(value: string) => setFieldValue('donatorDetails.gender', value)}
          title="Qual o seu gênero?"
      />
      <CustomRadioButton 
          initialValue="Não" 
          options={["Heterossexual", "Homossexual"]} 
          onValueChange={(value: string) => setFieldValue('donatorDetails.orientation', value)}
          title="Qual a sua orientação sexual?"
      />

      <Button title="Finalizar" onPress={handleNavigate} />
    </Container>
  );
};

export default DonatorData;

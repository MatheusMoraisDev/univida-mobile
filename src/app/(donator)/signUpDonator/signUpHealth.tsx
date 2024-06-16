import { Button } from "@/src/components/atoms/button";
import { Container } from "@/src/components/atoms/container";
import CustomRadioButton from "@/src/components/atoms/radioButton";
import CustomText from "@/src/components/atoms/text";
import { CustomTextInput } from "@/src/components/atoms/textInput";
import { IDonator } from "@/src/interfaces/donator.interface";
import { donatorService } from "@/src/services/donatorService";
import { userService } from "@/src/services/userService";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

const signUpHealthDonator = () => {
  const { values, setFieldValue, touched, errors, handleBlur } = useFormikContext<IDonator>();
  
  const router = useRouter();

  const isCurrentStepValid = (): boolean => {
    const requiredFields: Array<string> = [
      'donatorDetails.bloodType',
      'donatorDetails.hasAllergy',
      'donatorDetails.weightKilo',
      'donatorDetails.gender',
      'donatorDetails.orientation',
    ];

    if (values.donatorDetails.hasAllergy) {
      requiredFields.push('donatorDetails.allergyDescription');
    }

    return requiredFields.every((field) => {
      const [parent, child] = field.split('.') as [keyof IDonator, keyof IDonator['user']];
      if (child) {
        if (field === 'donatorDetails.hasAllergy') {
          return !(errors[parent] as any)?.[child]
        }
        return (values[parent] as any)?.[child] && !(errors[parent] as any)?.[child];
      }
      return values[field as keyof IDonator] && !errors[field as keyof IDonator];
    });
  };

  const onSubmitForm = async () => {
      try {
        const user = await userService.createUser({
          ...values.user,
          type: 'pf',
          confirmPassword: undefined,
        });
        await donatorService.createDonator({
          ...values,
          user: user,
        });

        router.push({ pathname: 'validationEmail', params: { user } });
      } catch (error) {
        console.error('Error creating donator', error);
      }
    }

  const handleBooleanConvert = (value: string) => {
    const hasAllergy = value === 'Sim';
    setFieldValue('donatorDetails.hasAllergy', hasAllergy);
  };

  return (
    <Container justify='center' align='center'>
      <CustomText align={"left"} font='regular' size={20}>Saúde</CustomText>
      <CustomTextInput
        placeholder='Qual é o seu tipo sanguíneo?'
        value={values.donatorDetails.bloodType}
        onChange={(value: string) => setFieldValue('donatorDetails.bloodType', value)}
        onBlur={handleBlur('donatorDetails.bloodType')}
        mt={20}
      />
      {touched.donatorDetails?.bloodType && errors.donatorDetails?.bloodType ? (
        <CustomText size={10} color="primary">{errors.donatorDetails.bloodType}</CustomText>
      ) : null}

      <CustomRadioButton 
        initialValue="Não" 
        options={["Sim", "Não"]} 
        onValueChange={handleBooleanConvert}
        title="Possui alergia?"
      />
      {touched.donatorDetails?.hasAllergy && errors.donatorDetails?.hasAllergy ? (
        <CustomText size={10} color="primary">{errors.donatorDetails.hasAllergy}</CustomText>
      ) : null}

      {values.donatorDetails.hasAllergy && (
        <CustomTextInput
          placeholder='Qual alergia você possui?'
          value={values.donatorDetails.allergyDescription || ''}
          onChange={(value: string) => setFieldValue('donatorDetails.allergyDescription', value)}
          onBlur={handleBlur('donatorDetails.allergyDescription')}
          mt={5}
        />
      )}
      {values.donatorDetails.hasAllergy &&
        touched.donatorDetails?.allergyDescription &&
        errors.donatorDetails?.allergyDescription ? (
          <CustomText size={10} color="primary">{errors.donatorDetails.allergyDescription}</CustomText>
        ) : null}

      <CustomTextInput
        placeholder='Qual é o seu peso em kg?'
        value={values.donatorDetails.weightKilo}
        onChange={(value: number) => setFieldValue('donatorDetails.weightKilo', value)}
        onBlur={handleBlur('donatorDetails.weightKilo')}
        mt={5}
      />
      {touched.donatorDetails?.weightKilo && errors.donatorDetails?.weightKilo ? (
        <CustomText size={10} color="primary">{errors.donatorDetails.weightKilo}</CustomText>
      ) : null}

      <CustomRadioButton 
        initialValue="Não" 
        options={["Masculino", "Feminino"]} 
        onValueChange={(value: string) => setFieldValue('donatorDetails.gender', value)}
        title="Qual o seu gênero?"
      />
      {touched.donatorDetails?.gender && errors.donatorDetails?.gender ? (
        <CustomText size={10} color="primary">{errors.donatorDetails.gender}</CustomText>
      ) : null}

      <CustomRadioButton 
        initialValue="Não" 
        options={["Heterossexual", "Homossexual"]} 
        onValueChange={(value: string) => setFieldValue('donatorDetails.orientation', value)}
        title="Qual a sua orientação sexual?"
      />
      {touched.donatorDetails?.orientation && errors.donatorDetails?.orientation ? (
        <CustomText size={10} color="primary">{errors.donatorDetails.orientation}</CustomText>
      ) : null}

      <Button title="Finalizar" onPress={onSubmitForm} disabled={!isCurrentStepValid()}/>
    </Container>
  );
};

export default signUpHealthDonator;

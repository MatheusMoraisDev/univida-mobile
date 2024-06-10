import { InputContainer, TextInput } from './styles';

interface ICustomTextInput {
  placeholder: string;
  mt?: number;
  secure?: boolean;
}

export const CustomTextInput = ({ placeholder, mt, secure=false }: ICustomTextInput) => {
  return (
    <InputContainer mt={mt}>
      <TextInput 
        placeholder={placeholder}
        secureTextEntry={secure}
      />
    </InputContainer>
  )
}

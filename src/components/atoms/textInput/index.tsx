import { InputContainer, TextInput } from './styles';

interface ICustomTextInput {
  placeholder: string;
  mt?: number;
  secure?: boolean;
  onChange?: (text: string) => void;
}

export const CustomTextInput = ({ placeholder, mt, secure=false, onChange }: ICustomTextInput) => {
  return (
    <InputContainer mt={mt}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChange}
      />
    </InputContainer>
  )
}

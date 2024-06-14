import { InputContainer, TextInput } from './styles';

interface ICustomTextInput {
  placeholder: string;
  mt?: number;
  secure?: boolean;
  onChange?: (text: any) => void;
  value?: any;
  onBlur?: (value: any) => void;
}

export const CustomTextInput = ({ placeholder, mt, secure=false, onChange, onBlur, value }: ICustomTextInput) => {
  return (
    <InputContainer mt={mt}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
      />
    </InputContainer>
  )
}

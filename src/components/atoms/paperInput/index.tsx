import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { theme } from "@/src/styles";
import { applyCepMask, applyCnpjMask, applyCpfMask, applyDateMask, applyPhoneMask, applyRgMask } from '@/src/utils/masks';

interface IPaperInputProps {
  label: string;
  value?: string;
  onChange: (text: string) => void;
  onBlur?: (value: any) => void;
  mode?: 'outlined' | 'flat';
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  style?: object;
  secure?: boolean;
  mt?: number;
  mask?: 'cpf' | 'phone' | 'cep' | 'cnpj' | 'date' | 'rg' | 'number';
  maxLenght?: number;
}

const PaperInput = ({
  label,
  value = '',
  onChange,
  onBlur,
  mode = 'outlined',
  placeholder = '',
  keyboardType = 'default',
  style = {},
  secure = false,
  mt = 20,
  mask,
  maxLenght,
}: IPaperInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
  
    if (mask === 'cpf') {
      formattedText = applyCpfMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'phone') {
      formattedText = applyPhoneMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'cep') {
      formattedText = applyCepMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'cnpj') {
      formattedText = applyCnpjMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'date') {
      formattedText = applyDateMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'rg') {
      formattedText = applyRgMask(formattedText);
      onChange(formattedText);
      return;
    }
  
    if (mask === 'number') {
      onChange(formattedText);
      return;
    }
  
    onChange(text);
  };
  

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleChange}
      onBlur={onBlur}
      mode={mode}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secure && !passwordVisible}
      selectionColor={theme.colors.gray}
      activeOutlineColor={theme.colors.primary}
      cursorColor={theme.colors.black}
      maxLength={maxLenght || 1000}
      style={[
        {
          marginTop: theme.metrics.px(mt),
          width: theme.metrics.px(280),
        },
        style,
      ]}
      right={
        secure && (
          <TextInput.Icon
            icon={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        )
      }
    />
  );
};

export default PaperInput;


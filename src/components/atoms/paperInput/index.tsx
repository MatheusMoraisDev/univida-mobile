import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { theme } from "@/src/styles";

interface IPaperInputProps {
  label: string;
  value?: string;
  onChange: (text: string) => void;
  onBlur?: (value: any) => void;
  mode?: 'outlined' | 'flat';
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  style?: object;
  secure?: boolean;
  mt?: number;
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
}: IPaperInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      mode={mode}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secure && !passwordVisible}
      selectionColor={theme.colors.gray}
      activeOutlineColor={theme.colors.primary}
      cursorColor={theme.colors.black}
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

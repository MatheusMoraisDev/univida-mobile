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

const PaperInput = (props: IPaperInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <TextInput
      label={props.label}
      value={props.value}
      onChangeText={props.onChange}
      onBlur={props.onBlur}
      mode={props.mode || 'outlined'}
      placeholder={props.placeholder || ''}
      keyboardType={props.keyboardType || 'default'}
      secureTextEntry={props.secure && !passwordVisible}
      selectionColor={theme.colors.gray}
      activeOutlineColor={theme.colors.primary}
      cursorColor={theme.colors.black}
      style={[
        {
          marginTop: theme.metrics.px(props.mt !== undefined ? props.mt : 20),
          width: theme.metrics.px(280)
        },
        props.style
      ]}
      right={
        props.secure && (
          <TextInput.Icon
            icon={passwordVisible ? "eye" : "eye-off"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        )
      }
    />
  );
};

export default PaperInput;

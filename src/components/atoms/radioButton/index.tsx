import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import CustomText from '../text';
import { theme } from '@/src/styles';
import { OptionContainer, RadioButtonStyle } from './styles';

interface RadioButtonProps {
  title: string;
  options: string[];
  initialValue?: string;
  onValueChange: (value: any) => void;
}

const CustomRadioButton = ({ options, initialValue, onValueChange, title}: RadioButtonProps) => {
  const [checked, setChecked] = useState(initialValue || '');

  const handleValueChange = (newValue: string) => {
    setChecked(newValue);
    onValueChange(newValue);
  };

  return (
    <RadioButtonStyle>
      <CustomText mt={10} size={16}>{title}</CustomText>
      {options.map((option, index) => (
        <OptionContainer key={index}>
          <RadioButton
            value={option}
            status={checked === option ? 'checked' : 'unchecked'}
            onPress={() => handleValueChange(option)}
            color={theme.colors.primary}
          />
          <Text>{option}</Text>
        </OptionContainer>
      ))}
    </RadioButtonStyle>
  );
};

export default CustomRadioButton;

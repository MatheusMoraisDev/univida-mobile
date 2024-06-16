import React, { useRef, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { OtpInputContainer, OtpInputStyle } from './styles';
import { theme } from '@/src/styles';

interface OtpInputProps {
  length: number;
  onChangeOtp: (otp: string) => void;
  mt?: number;
}

const OtpInput = ({ length, onChangeOtp, mt }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const focusNextInput = (index: number) => {
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleTextChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChangeOtp(newOtp.join(''));

    if (text && text.length === 1) {
      focusNextInput(index);
    }
  };

  return (
    <OtpInputContainer mt={mt}>
      {otp.map((digit, index) => (
        <OtpInputStyle key={index}>
          <TextInput
            ref={ref => (inputRefs.current[index] = ref as TextInput)}
            onChangeText={text => handleTextChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
            selectTextOnFocus={true}
            textAlign="center"
            selectionColor={theme.colors.gray}
            style={{
              fontSize: theme.metrics.px(18),
            }}
            value={digit}
          />
        </OtpInputStyle>
      ))}
    </OtpInputContainer>
  );
};

export default OtpInput;

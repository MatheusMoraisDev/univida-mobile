import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { ButtonText } from './styles';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '@/src/styles';

interface IButton {
  title: string;
  mt?: number;
  onPress?: () => void;
  disabled?: boolean;
  bottomButton?: boolean;
}

export const Button = ({ title, mt, onPress, disabled, bottomButton }: IButton) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
          marginTop: bottomButton ? 0 : (mt || 40),
        },
        bottomButton ? styles.bottomButton : null
      ]}
      borderless={true}
      disabled={disabled}
    >
      <ButtonText disabled={disabled}>{title}</ButtonText>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    width: theme.metrics.px(280),
    height: theme.metrics.px(40),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: theme.metrics.px(45),
    borderRadius: 0,
  },
});

export default Button;

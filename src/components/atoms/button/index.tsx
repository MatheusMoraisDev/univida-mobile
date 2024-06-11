import React from 'react';
import { TouchableRipple, Text } from 'react-native-paper';
import { ButtonText } from './styles';
import { theme } from '@/src/styles';

interface IButton {
  title: string;
  mt?: number;
  onPress: () => void;
}

export const Button = ({ title, mt, onPress }: IButton) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={{
        borderRadius: 30,
        overflow: 'hidden',
        width: theme.metrics.px(280),
        height: theme.metrics.px(40),
        marginTop: mt || 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
      borderless={true}
    >
      <ButtonText>{title}</ButtonText>
    </TouchableRipple>
  );
};

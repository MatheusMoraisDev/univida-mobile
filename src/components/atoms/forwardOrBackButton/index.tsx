import { theme } from '@/src/styles';
import React from 'react';
import { IconButton } from 'react-native-paper';

interface IForwardOrBackButton {
  back?: boolean;
  onPress?: () => void;
  mt?: number;
  disabled?: boolean;
}

const ForwardOrBackButton = ({ back, onPress, mt=100, disabled }: IForwardOrBackButton) => {
  return (
      <IconButton
        icon={back ? "arrow-left-circle" : "arrow-right-circle"}
        onPress={onPress}
        iconColor={theme.colors.primary}
        style={{ marginTop: theme.metrics.px(mt) || theme.metrics.px(100)}}
        size={theme.metrics.px(80)}
        disabled={disabled}
      />
  );
};

export default ForwardOrBackButton;

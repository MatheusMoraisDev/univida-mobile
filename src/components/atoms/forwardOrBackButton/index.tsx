import { theme } from '@/src/styles';
import React from 'react';
import { IconButton } from 'react-native-paper';

interface IForwardOrBackButton {
  back: boolean;
  onPress: () => void;
}

const ForwardOrBackButton = ({ back, onPress }: IForwardOrBackButton) => {
  return (
      <IconButton
        icon={back ? "arrow-left-circle" : "arrow-right-circle"}
        onPress={onPress}
        iconColor={theme.colors.primary}
        style={{ marginTop: theme.metrics.px(100) }}
        size={theme.metrics.px(80)}
      />
  );
};

export default ForwardOrBackButton;

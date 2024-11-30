import React from "react";
import { TouchableRipple } from "react-native-paper";
import { ButtonText } from "./styles";
import { StyleSheet, View } from "react-native";
import { theme } from "@/src/styles";
import { IconButton } from "react-native-paper"; // Usando IconButton do react-native-paper

interface IButton {
  title: string;
  mt?: number;
  onPress?: () => void;
  disabled?: boolean;
  bottomButton?: boolean;
  icon?: string;
}

export const Button = ({
  title,
  mt,
  onPress,
  disabled,
  bottomButton,
  icon,
}: IButton) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
          marginTop: bottomButton ? 0 : mt || 40,
        },
        bottomButton ? styles.bottomButton : null,
      ]}
      borderless={true}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {icon && <IconButton icon={icon} size={20} style={styles.icon} />}
        <ButtonText disabled={disabled}>{title}</ButtonText>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    zIndex: 100,
    overflow: "hidden",
    width: theme.metrics.px(280),
    height: theme.metrics.px(40),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: theme.metrics.px(45),
    borderRadius: 0,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

export default Button;

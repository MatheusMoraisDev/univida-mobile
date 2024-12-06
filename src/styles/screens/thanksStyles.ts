import { Animated } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const ModalContainer = styled.View`
  width: 80%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Icon = styled(IconButton)`
  color: #3b82f6;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #333;
`;

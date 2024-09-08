import { IconButton, TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "@/src/styles";

export const GridMenuContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.metrics.px(30)}px;
  padding: ${({ theme }) => theme.metrics.px(18)}px;
  width: 100%;
`;

export const GridMenuItem = styled(TouchableRipple)`
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.metrics.px(155)}px;
  height: ${({ theme }) => theme.metrics.px(180)}px;
  border-radius: ${({ theme }) => theme.metrics.px(20)}px;
  background-color: ${({ theme }) => theme.colors?.primary};
  margin-bottom: ${({ theme }) => theme.metrics.px(10)}px;
  overflow: hidden;

  /* iOS shadow */
  shadow-color: ${theme.colors.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;

  /* Android shadow */
  elevation: 5;
`;

export const GridMenuItemContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px;
  height: 100px;
`;

export const IconWrapper = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: ${({ theme }) => theme.metrics.px(-20)}px;
`;

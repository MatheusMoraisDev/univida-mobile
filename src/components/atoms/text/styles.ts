import { theme } from "@/src/styles";
import styled from "styled-components/native";

interface TextProps {
  size?: number;
  font?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: 'primary' | 'black' | 'white';
  mt?: number;
}

const getFont = (font: string) => {
  switch (font) {
    case 'regular':
      return 'Inter_400Regular';
    case 'medium':
      return 'Inter_500Medium';
    case 'semiBold':
      return 'Inter_600SemiBold';
    case 'bold':
      return 'Inter_700Bold';
    default:
      return 'Inter_400Regular';
  }
}

const getColor = (color: string) => {
  switch (color) {
    case 'primary':
      return theme.colors.primary;
    case 'black':
      return theme.colors.black;
    case 'white':
      return theme.colors.white;
    default:
      return theme.colors.black;
  }
}

export const CustomTextStyle = styled.Text<TextProps>`
  color: ${({ color }) => getColor(color || 'black')};
  font-size: ${({ size, theme }) => theme.metrics.px(size) || theme.metrics.px(18)}px;
  font-family: ${({ font }) => getFont(font || 'regular')};
  margin-top: ${({ mt, theme }) => theme.metrics.px(mt)}px;
`;
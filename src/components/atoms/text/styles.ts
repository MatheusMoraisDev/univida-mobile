import styled from "styled-components/native";
import { theme } from "@/src/styles";

interface TextProps {
  size?: number;
  font?: "regular" | "medium" | "semiBold" | "bold";
  color?: "primary" | "black" | "white";
  align?: "center" | "left" | "right";
  mt?: number;
}

const getFont = (font: string) =>
  ({
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  })[font] || "Inter_400Regular";

const getColor = (color: string) =>
  ({
    primary: theme.colors.primary,
    black: theme.colors.black,
    white: theme.colors.white,
  })[color] || theme.colors.black;

export const CustomTextStyle = styled.Text<TextProps>`
  color: ${({ color }) => getColor(color || "black")};
  font-size: ${({ size }) => theme.metrics.px(size || 18)}px;
  font-family: ${({ font }) => getFont(font || "regular")};
  text-align: ${({ align }) => align || "left"};
  margin-top: ${({ mt }) => theme.metrics.px(mt || 0)}px;
`;

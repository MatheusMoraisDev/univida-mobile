import styled from "styled-components/native";
import { ISize } from ".";

interface ILogoProps {
  size: ISize;
  mt: number;
}

export const LogoImage = styled.Image<ILogoProps>`
  width: ${({ size, theme }) => theme.metrics.px(size.width)}px;
  height: ${({ size, theme }) => theme.metrics.px(size.height)}px;
  margin-top: ${({ mt, theme }) => theme.metrics.px(mt)}px;
`;

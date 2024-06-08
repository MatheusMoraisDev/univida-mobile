import styled from "styled-components/native";
import { ISize } from ".";

interface ILogoProps {
  size: ISize;
}

export const LogoImage = styled.Image<ILogoProps>`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
`;
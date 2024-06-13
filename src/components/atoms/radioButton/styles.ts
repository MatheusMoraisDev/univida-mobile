import { styled } from "styled-components/native";

export const RadioButtonStyle = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${({ theme }) => theme.metrics.px(280)}px;
`;

export const OptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

import styled from "styled-components/native";

export const FirstAccessStyles = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.metrics.px(20)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;
import styled from "styled-components/native";

export const HeaderTextContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.metrics.px(16)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const StyledSelectDateContainer = styled.View`
  background-color: white;
  flex: 1;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.metrics.px(20)}px;
`;

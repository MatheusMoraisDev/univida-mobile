import styled from "styled-components/native";

export const StepsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.metrics.px(50)}px;
  margin-bottom: ${({ theme }) => theme.metrics.px(20)}px;
`;

export const StepStyles = styled.View<{ isActive: boolean }>`
  width: ${({ theme }) => theme.metrics.px(30)}px;
  height: ${({ theme }) => theme.metrics.px(30)}px;
  border-radius: ${({ theme }) => theme.metrics.px(30)}px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.gray};
  justify-content: center;
  align-items: center;
`;

export const StepText = styled.Text<{ isActive: boolean }>`
  font-size: ${({ theme }) => theme.metrics.px(18)}px;
  font-family: ${({ theme }) => theme.fonts.Inter_600SemiBold};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.mediumGray};
`;

export const StepLine = styled.View`
  width: ${({ theme }) => theme.metrics.px(20)}px;
  height: ${({ theme }) => theme.metrics.px(2)}px;
  background-color: ${({ theme }) => theme.colors.gray};
  align-self: center;
`;

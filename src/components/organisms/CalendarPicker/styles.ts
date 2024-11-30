import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  /* padding: 24px; */
  margin-top: ${({ theme }) => theme.metrics.px(20)};
  width: 100%;
`;

export const CalendarContainer = styled.View`
  background-color: transparent;
`;

export const DayButton = styled.TouchableOpacity<{ isSelected?: boolean }>`
  width: ${({ theme }) => theme.metrics.px(30)};
  height: ${({ theme }) => theme.metrics.px(30)};
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : "transparent"};
`;

export const DayText = styled.Text<{
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
}>`
  color: ${({ isSelected, isToday, isDisabled, theme }) =>
    isSelected
      ? theme.colors.white
      : isToday
        ? theme.colors.primary
        : isDisabled
          ? "#717171"
          : theme.colors.black};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;

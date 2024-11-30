import CustomText from "@/src/components/atoms/text";
import { Text } from "react-native";
import styled from "styled-components/native";

export const HospitalCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.metrics.px(16)}px;
  margin-bottom: ${({ theme }) => theme.metrics.px(12)}px;
  border-radius: ${({ theme }) => theme.metrics.px(8)}px;
  elevation: 1;
  width: 100%;
`;

export const HospitalName = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.px(15)}px;
  font-weight: bold;
`;

export const DistanceInfo = styled(Text)`
  position: absolute;
  right: ${({ theme }) => theme.metrics.px(16)}px;
  top: ${({ theme }) => theme.metrics.px(18)}px;
  font-size: ${({ theme }) => theme.metrics.px(14)}px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const HeaderTextContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.metrics.px(16)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const HospitalAddress = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.px(10)}px;
  font-size: ${({ theme }) => theme.metrics.px(14)}px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

export const HospitalListContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.px(16)}px;
`;

export const StyledSchedulerContainer = styled.View`
  background-color: white;
  flex: 1;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.metrics.px(20)}px;
`;

export const TimeButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#e0e0e0"};
  padding-vertical: ${({ theme }) => theme.metrics.px(8)}px;
  padding-horizontal: ${({ theme }) => theme.metrics.px(16)}px;
  margin-horizontal: ${({ theme }) => theme.metrics.px(5)}px;
  border-radius: ${({ theme }) => theme.metrics.px(20)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.metrics.px(85)}px;
  height: ${({ theme }) => theme.metrics.px(35)}px;
`;

export const TimeButtonText = styled(Text)<{ selected: boolean }>`
  color: ${({ selected, theme }) => (selected ? theme.colors.white : "black")};
`;

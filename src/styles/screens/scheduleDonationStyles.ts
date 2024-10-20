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
  color: ${({ theme }) => theme.colors.mediumGray}px;
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
  color: ${({ theme }) => theme.colors.mediumGray}px;
`;

export const HospitalListContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.px(16)}px;
`;

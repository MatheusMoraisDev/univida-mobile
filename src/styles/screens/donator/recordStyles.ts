import styled from "styled-components/native";

export const DonatesListContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.px(16)}px;
`;

export const DonateCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.metrics.px(16)}px;
  margin-bottom: ${({ theme }) => theme.metrics.px(12)}px;
  border-radius: ${({ theme }) => theme.metrics.px(8)}px;
  elevation: 1;
  width: 100%;
`;

export const AppointmentDetailsContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const DateTimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const LabelValue = styled.Text`
  font-weight: bold;
  margin-right: 5px;
`;

export const Value = styled.Text`
  font-weight: normal;
`;

export const LocationRow = styled.View`
  margin-bottom: 5px;
`;

export const AddressRow = styled.View`
  flex-direction: column;
  margin-bottom: 10px;
`;

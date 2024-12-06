import styled from "styled-components/native";
import Button from "../button";

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.View`
  width: 90%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ModalButton = styled(Button)<{ cancel?: boolean }>`
  background-color: ${(props) => (props.cancel ? "#ddd" : "#3b82f6")};
  padding: 10px 20px;
  border-radius: 5px;
`;

export const ModalButtonText = styled.Text<{ cancel?: boolean }>`
  color: ${(props) => (props.cancel ? "#000" : "#fff")};
  font-size: 16px;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 10px;
`;

export const CloseButtonText = styled.Text`
  font-size: 25px;
  font-weight: 400;
  color: #333;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

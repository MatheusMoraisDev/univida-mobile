import React from "react";
import {
  Modal as RNModal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  ModalActions,
  ModalButton,
  ModalContainer,
  ModalOverlay,
  CloseButton,
  CloseButtonText,
} from "./styles";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const Modal = ({ visible, onClose, onConfirm, children }: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <ModalOverlay>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ModalContainer>
              <CloseButton onPress={onClose}>
                <CloseButtonText>x</CloseButtonText>
              </CloseButton>
              {children}
              <ModalActions>
                {onConfirm && (
                  <ModalButton onPress={onConfirm} title="Confirmar" />
                )}
              </ModalActions>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;

import React from "react";
import { Modal as RNModal } from "react-native";
import {
  ModalActions,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay,
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
      animationType="slide"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContainer>
          {children}
          <ModalActions>
            {onConfirm && (
              <ModalButton onPress={onConfirm}>
                <ModalButtonText>Confirmar</ModalButtonText>
              </ModalButton>
            )}
            <ModalButton onPress={onClose}>
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
          </ModalActions>
        </ModalContainer>
      </ModalOverlay>
    </RNModal>
  );
};

export default Modal;

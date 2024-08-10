import Toast from "react-native-toast-message";

const showToastError = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Erro!",
    text2: message,
    visibilityTime: 4000,
    autoHide: true,
  });
};

export default showToastError;

import {
  BaseToast,
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import { theme } from "../styles";

const toastConfig: ToastConfig = {
  error: ({ text1, text2, ...rest }: ToastConfigParams<any>) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: theme.colors.error,
        backgroundColor: theme.colors.error,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: theme.metrics.px(16),
        fontWeight: "400",
        color: "#fff",
      }}
      text2Style={{
        fontSize: theme.metrics.px(14),
        color: "#fff",
      }}
      text1={text1}
      text2={text2}
    />
  ),
  success: ({ text1, text2, ...rest }: ToastConfigParams<any>) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: theme.colors.green,
        backgroundColor: theme.colors.green,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: theme.metrics.px(16),
        fontWeight: "400",
        color: "#fff",
      }}
      text2Style={{
        fontSize: theme.metrics.px(14),
        color: "#fff",
      }}
      text1={text1}
      text2={text2}
    />
  ),
  warning: ({ text1, text2, ...rest }: ToastConfigParams<any>) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: "ffa500",
        backgroundColor: "ffa500",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: theme.metrics.px(16),
        fontWeight: "400",
        color: "#fff",
      }}
      text2Style={{
        fontSize: theme.metrics.px(14),
        color: "#fff",
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

export { toastConfig };

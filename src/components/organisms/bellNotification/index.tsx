import { theme } from "@/src/styles";
import BellNotificationStyle from "./styles";

const BellNotification = () => {
  return (
    <BellNotificationStyle
      icon="bell-outline"
      size={theme.metrics.px(35)}
      onPress={() => {
        /* Lógica para abrir o popup */
      }}
    />
  );
};

export default BellNotification;

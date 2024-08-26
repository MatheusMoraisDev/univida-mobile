import { theme } from "@/src/styles";
import CustomText from "../../atoms/text";
import { GridMenuItemContentContainer, IconWrapper } from "./styles";

interface IGridMenuItemContent {
  icon: string;
  title: string;
}

const GridMenuItemContent = ({ icon, title }: IGridMenuItemContent) => (
  <GridMenuItemContentContainer>
    <IconWrapper icon={icon} size={theme.metrics.px(28)} iconColor="white" />
    <CustomText color="white">{title}</CustomText>
  </GridMenuItemContentContainer>
);
export default GridMenuItemContent;

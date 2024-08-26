import { useRouter } from "expo-router";
import GridMenuItemContent from "./gridMenuItemContent";
import { GridMenuContainer, GridMenuItem } from "./styles";

interface IGridMenuOptions {
  title: string;
  icon: string;
  link: string;
}

export interface IGridMenuProps {
  options: Array<IGridMenuOptions>;
}

const GridMenu = ({ options }: IGridMenuProps) => {
  const router = useRouter();

  return (
    <GridMenuContainer>
      {options.map((option) => (
        <GridMenuItem
          key={option.title}
          onPress={() => router.push(option.link)}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={true}
        >
          <GridMenuItemContent icon={option.icon} title={option.title} />
        </GridMenuItem>
      ))}
    </GridMenuContainer>
  );
};

export default GridMenu;

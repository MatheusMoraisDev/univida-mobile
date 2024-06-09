import logoImage from '../../../../assets/images/logo.png'
import { LogoImage } from './styles';

export interface ISize {
  height: string;
  width: string;
}

const sizes: { [key: string]: ISize } = {
  small: {
    height: "75",
    width: "70",
  },
  medium: {
    height: "100",
    width: "93",
  },
  large: {
    height: "150",
    width: "140",
  },
};

export const Logo = ({ size }: { size?: string }) => {
  return <LogoImage source={logoImage} size={sizes[size || 'large']}/>;
}
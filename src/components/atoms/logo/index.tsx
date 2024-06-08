import logoImage from '../../../../assets/images/logo.png'
import { LogoImage } from './styles';

export interface ISize {
  height: string;
  width: string;
}


const sizes: { [key: string]: ISize } = {
  small: {
    height: "75px",
    width: "70px",
  },
  medium: {
    height: "100px",
    width: "93px",
  },
  large: {
    height: "150px",
    width: "140px",
  },
};

export const Logo = ({ size }: { size?: string }) => {
  return <LogoImage source={logoImage} size={sizes[size || 'large']}/>;
}
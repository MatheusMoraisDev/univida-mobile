import React from 'react';
import logoImage from '../../../../assets/images/logo.png';
import { LogoImage } from './styles';

export interface ISize {
  height: number;
  width: number;
}

const sizes: { [key: string]: ISize } = {
  small: {
    height: 100,
    width: 93,
  },
  medium: {
    height: 122,
    width: 112,
  },
  large: {
    height: 150,
    width: 140,
  },
};

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  mt?: number;
}

export const Logo = ({ size = 'large', mt = 0 }: LogoProps) => {
  const selectedSize = sizes[size];

  return (
    <LogoImage source={logoImage} size={selectedSize} mt={mt} />
  );
};

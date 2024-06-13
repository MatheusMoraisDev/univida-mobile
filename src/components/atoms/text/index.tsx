import React, { ReactNode } from 'react';
import { CustomTextStyle } from './styles';

interface CustomTextProps {
  children: ReactNode;
  size?: number;
  font?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: 'primary' | 'black' | 'white';
  align?: 'center' | 'left' | 'right';
  mt?: number;
}

const CustomText = ({ align, size, font, color, mt, children }: CustomTextProps) => {
  return (
    <CustomTextStyle align={align} size={size} font={font} color={color} mt={mt}>
      {children}
    </CustomTextStyle>
  );
}

export default CustomText;

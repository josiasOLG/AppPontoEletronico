import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
};

const ButtonAtom: React.FC<ButtonProps> = ({ children, ...props }) => (
  <TouchableOpacity {...props}>
    {children}
  </TouchableOpacity>
);

export default ButtonAtom;

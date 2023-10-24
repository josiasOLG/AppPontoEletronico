import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

type LibraryType = 'FontAwesome' | 'Ionicons' | 'MaterialIcons';

type IconProps = {
  name: string;
  size: number;
  color: string;
  library?: LibraryType;
};

const IconAtom: React.FC<IconProps> = ({ name, size, color, library = 'FontAwesome', ...props }) => {
  switch (library) {
    case 'Ionicons':
      return <Ionicons {...props} name={name} size={size} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons {...props} name={name} size={size} color={color} />;
    default:
    case 'FontAwesome':
      return <FontAwesome {...props} name={name} size={size} color={color} />;
  }
};

export default IconAtom;

import React from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

type LibraryType = "FontAwesome" | "Ionicons" | "MaterialIcons";

type IconProps = {
  name: string;
  size: number;
  color: string;
  library?: LibraryType;
  style?: StyleProp<ViewStyle>; // Tipo correto para estilos
};

const IconAtom: React.FC<IconProps> = ({
  name,
  size,
  color,
  library = "FontAwesome",
  style,
  ...props
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
    ...props,
  };

  switch (library) {
    case "Ionicons":
      return <Ionicons {...iconProps} />;
    case "MaterialIcons":
      return <MaterialIcons {...iconProps} />;
    default:
    case "FontAwesome":
      return <FontAwesome {...iconProps} />;
  }
};

export default IconAtom;

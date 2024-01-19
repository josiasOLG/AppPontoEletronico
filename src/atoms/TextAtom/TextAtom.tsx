import React from "react";
import {
  Text,
  TextProps as DefaultTextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";

type TextProps = DefaultTextProps & {
  text: string;
  style?: StyleProp<TextStyle>; // Incluindo a propriedade style com o tipo correto
};

const TextAtom: React.FC<TextProps> = ({ text, style, ...props }) => (
  <Text style={style} {...props}>
    {text}
  </Text> // Aplicando o estilo ao componente Text
);

export default TextAtom;

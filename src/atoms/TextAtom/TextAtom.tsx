import React from 'react';
import { Text, TextProps as DefaultTextProps, StyleSheet } from 'react-native';

type TextProps = DefaultTextProps & {
  text: string;
};

const TextAtom: React.FC<TextProps> = ({ text, ...props }) => (
  <Text {...props}>{text}</Text>
);

export default TextAtom;

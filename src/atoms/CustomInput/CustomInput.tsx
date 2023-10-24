import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface CustomInputProps extends TextInputProps {}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return <TextInput style={styles.input} placeholderTextColor={"#fff"} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 250,
    color: "#fff",
  },
});

export default CustomInput;

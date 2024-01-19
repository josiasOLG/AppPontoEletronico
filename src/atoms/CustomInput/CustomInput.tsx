import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import IconAtom from "../IconAtom/IconAtom";

interface CustomInputProps extends TextInputProps {
  placeholderColor?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconLibrary?: "FontAwesome" | "Ionicons" | "MaterialIcons";
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholderColor = "#333",
  iconName,
  iconSize = 20,
  iconColor = "#333",
  iconLibrary,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {iconName && (
        <IconAtom
          name={iconName}
          size={iconSize}
          color={iconColor}
          library={iconLibrary}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
  },
  input: {
    padding: 10,
    width: "100%",
    color: "#333",
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default CustomInput;

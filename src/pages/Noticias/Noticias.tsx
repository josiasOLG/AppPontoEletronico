import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";

const Noticias: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Noticias</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Noticias;

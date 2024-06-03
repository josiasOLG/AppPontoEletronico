// src/pages/Noticias.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";

const Ponto: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBarAtoms backgroundColor="#010818" barStyle="light-content" />
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

export default Ponto;

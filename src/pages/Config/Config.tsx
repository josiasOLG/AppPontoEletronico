// src/pages/Noticias.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Config: React.FC = () => {
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

export default Config;

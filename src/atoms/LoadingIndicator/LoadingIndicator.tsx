import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingIndicator: React.FC = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color="#FCD057" />
  </View>
);

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    width: "100%",
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

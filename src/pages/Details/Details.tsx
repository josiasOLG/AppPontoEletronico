import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import DetailsOrganism from "../../organisms/Details/DetailsOrganism/DetailsOrganism";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";

interface LinearGradientProps {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  style: ViewStyle;
}

interface StatusBarProps {
  backgroundColor: string;
  barStyle: "default" | "light-content" | "dark-content";
}

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<DetailsScreenProps> = ({ route }) => {
  const { param } = route.params;

  const linearGradientProps: LinearGradientProps = {
    colors: ["#AF1B3F", "#272838"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    style: styles.gradientEffect,
  };

  const statusBarProps: StatusBarProps = {
    backgroundColor: "transparent",
    barStyle: "dark-content",
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBarAtoms {...statusBarProps} />
        <LinearGradient {...linearGradientProps} />
        <DetailsOrganism activeTab={param} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272838",
    paddingTop: 20,
  } as ViewStyle,
  gradientEffect: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0,
  } as ViewStyle,
});

export default Details;

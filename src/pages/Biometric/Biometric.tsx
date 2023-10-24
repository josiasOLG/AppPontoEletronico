import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "../../routes/NavigationService";
import { authenticate } from "../../biometric/BiometricAuth";
import BiometricOrganism from "../../organisms/Biometric/BiometricOrganism/BiometricOrganism";

const Biometric: React.FC = () => {
  const authenticateUser = async () => {
    const authResult = await authenticate();
    if (authResult) {
      NavigationService.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
          colors={["#006400", "#20B2AA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientEffect}
        />
      <BiometricOrganism onAuthenticate={authenticateUser} onAnimationFinish={authenticateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010818",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientEffect: {
    position: "absolute",
    width: "100%",
    height: 300,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0,
  },
});

export default Biometric;

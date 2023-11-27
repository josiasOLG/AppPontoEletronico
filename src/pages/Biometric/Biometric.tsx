import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "../../routes/NavigationService";
import { authenticate } from "../../biometric/BiometricAuth";
import BiometricOrganism from "../../organisms/Biometric/BiometricOrganism/BiometricOrganism";
import { styles } from "../../styles/PageStyle/BiometricStyle/BiometricStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const Biometric: React.FC = () => {
  const authenticateUser = async () => {
    try {
      const authResult = await authenticate();
      // console.log(authResult);
      if (authResult) {
        NavigationService.navigate("Home");
      }
    } catch (e: any) {
      // console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#AF1B3F", "#272838"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientEffect}
        />
        <BiometricOrganism
          onAuthenticate={authenticateUser}
          onAnimationFinish={authenticateUser}
        />
      </View>
    </SafeAreaView>
  );
};

export default Biometric;

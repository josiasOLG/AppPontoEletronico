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
      <LinearGradient
        colors={["#34AADC", "#0A617C", "#007AFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container2}
      >
        <BiometricOrganism
          onAuthenticate={authenticateUser}
          onAnimationFinish={authenticateUser}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Biometric;

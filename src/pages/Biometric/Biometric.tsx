import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "../../routes/NavigationService";
import { authenticate } from "../../biometric/BiometricAuth";
import BiometricOrganism from "../../organisms/Biometric/BiometricOrganism/BiometricOrganism";
import { styles } from "../../styles/PageStyle/BiometricStyle/BiometricStyle";

const Biometric: React.FC = () => {
  const authenticateUser = async () => {
    try {
      const authResult = await authenticate();
      // console.log(authResult);
      if (authResult) {
        NavigationService.navigate("Home");
      }
    }catch(e: any){
      // console.log(e);
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

export default Biometric;

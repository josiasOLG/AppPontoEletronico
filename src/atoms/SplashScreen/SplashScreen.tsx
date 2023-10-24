import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Certifique-se de ter instalado o 'expo-linear-gradient' 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 200,  // Largura desejada
    height: 200, // Altura desejada
  },
});

const SplashScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => (
  <LinearGradient
    style={styles.container}
    colors={["#006400", "#20B2AA"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <LottieView
      source={require('../../../assets/animation2.json')}
      autoPlay
      loop={false}
      onAnimationFinish={onAnimationFinish}
      style={styles.lottie}
      speed={1.0}
    />
  </LinearGradient>
);

export default SplashScreen;

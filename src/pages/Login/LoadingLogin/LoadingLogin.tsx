import React, { useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IconAtom from "../../../atoms/IconAtom/IconAtom";
import { styles } from "../../../styles/PageStyle/BiometricStyle/BiometricStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingLogin: React.FC = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    rotate.setValue(0);
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container2}>
        <LinearGradient
          colors={["#34AADC", "#0A617C", "#007AFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientEffect}
        >
          <View style={stylesIndex.content}>
            <Text style={stylesIndex.title}>Acessando o Sistema</Text>
            <Text style={stylesIndex.subtitle}>
              Por favor, aguarde um momento.
            </Text>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <IconAtom
                name="spinner"
                size={50}
                color="#333"
                library="FontAwesome"
              />
            </Animated.View>
          </View>
          <View style={stylesIndex.contentFooter}>
            {/* <Text style={stylesIndex.loadingText}>
              Estamos verificando suas credenciais e preparando tudo para você.
            </Text>
            <Text style={stylesIndex.footerText}>
              Dica: Você sabia que também pode utilizar a autenticação biométrica
              para um acesso mais rápido e seguro?
            </Text> */}
            <Image
              source={require("../../../../assets/logo.png")}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const stylesIndex = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginTop: 80,
    padding: 20,
  },
  contentFooter: {
    alignItems: "center",
    marginTop: 80,
    padding: 20,
  },
  loadingText: {
    color: "white",
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "900",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  footerText: {
    fontSize: 18,
    color: "white",
    marginTop: 30,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 25,
  },
});

export default LoadingLogin;

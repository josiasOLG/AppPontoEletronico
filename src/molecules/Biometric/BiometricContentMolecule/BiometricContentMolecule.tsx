import React from "react";
import LottieView from "lottie-react-native";
import { Image, StyleSheet, View } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import { LinearGradient } from "expo-linear-gradient";

interface BiometricContentMoleculeProps {
  onAnimationFinish: () => void;
}

const BiometricContentMolecule: React.FC<BiometricContentMoleculeProps> = ({
  onAnimationFinish,
}) => {
  return (
    <View style={styles.content}>
      <TextAtom text="Bem-Vindo de Volta!" style={styles.title} />
      <View>
        <LinearGradient
          colors={["#0A617C", "#34AADC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.circleImage}
        >
          <Image
            source={require("../../../../assets/user.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  biometriaView2: {
    paddingTop: 340,
  },
  circleImage: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    width: 250,
    height: 250,
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 100,
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
export default BiometricContentMolecule;

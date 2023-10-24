import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";

interface BiometricContentMoleculeProps {
  onAnimationFinish: () => void;
}

const BiometricContentMolecule: React.FC<BiometricContentMoleculeProps> = ({
  onAnimationFinish,
}) => {
  return (
    <View style={styles.content}>
      <LottieView
        source={require("../../../../assets/icon-biometria.json")}
        autoPlay
        onAnimationFinish={onAnimationFinish}
        loop={false}
        speed={1.0}
      />
      <View style={styles.biometriaView2}>
        <TextAtom text="Autenticação Biométrica" style={styles.title} />
        <TextAtom
          text="Por favor, coloque o seu dedo no sensor ou faça o login com o seu FaceID."
          style={styles.subtitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: 'relative',
    top: -30,
  },
  biometriaView2: {
    paddingTop: 340,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
export default BiometricContentMolecule;

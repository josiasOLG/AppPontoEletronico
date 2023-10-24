import React from "react";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../../atoms/ButtonAtom/ButtonAtom";
import IconAtom from "../../../atoms/IconAtom/IconAtom";
import { StyleSheet, View } from "react-native";

interface BiometricHeaderMoleculeProps {
  onAuthenticate: () => void;
}

const BiometricHeaderMolecule: React.FC<BiometricHeaderMoleculeProps> = ({
  onAuthenticate,
}) => {
  return (
    <View style={styles.biometriaView}>
      <TextAtom text="Autenticação" style={styles.title2} />
      <TextAtom
        text="Apos realizar a biometria você poderá acessar a plataforma"
        style={styles.subtitle2}
      />
      <ButtonAtom onPress={onAuthenticate} style={styles.btn}>
        <IconAtom name="refresh" size={50} color="white" library="Ionicons" />
      </ButtonAtom>
    </View>
  );
};

const styles = StyleSheet.create({
  biometriaView: {
    paddingTop: 80,
  },
  biometriaView2: {
    paddingTop: 200,
  },
  title2: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle2: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    lineHeight: 32,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 1
  },
});

export default BiometricHeaderMolecule;

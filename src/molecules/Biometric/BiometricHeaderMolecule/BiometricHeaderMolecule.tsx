import React from "react";
import { StyleSheet, View } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../../atoms/ButtonAtom/ButtonAtom";

interface BiometricHeaderMoleculeProps {
  onAuthenticate: () => void;
}

const BiometricHeaderMolecule: React.FC<BiometricHeaderMoleculeProps> = ({
  onAuthenticate,
}) => {
  return (
    <View style={styles.biometriaView}>
      <ButtonAtom onPress={onAuthenticate} style={styles.btn}>
        <View style={styles.fullWidth}>
          <TextAtom text="Entrar como Heitor" style={styles.btnText} />
        </View>
      </ButtonAtom>
      <ButtonAtom onPress={onAuthenticate} style={styles.link}>
        <View style={styles.fullWidth}>
          <TextAtom text="Deletar conta" style={styles.btnText} />
        </View>
      </ButtonAtom>
    </View>
  );
};

const styles = StyleSheet.create({
  biometriaView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch", // Alterado para 'stretch' para esticar os filhos
    paddingTop: 40,
  },
  btn: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#34AADC",
    paddingHorizontal: 60,
    paddingVertical: 10,
    width: "100%",
  },
  link: {
    backgroundColor: "transparent",
    marginTop: 10,
    paddingHorizontal: 80,
    paddingVertical: 10,
    width: "100%",
  },
  fullWidth: {
    width: "100%", // Garante que a View ocupe toda a largura do botão
    alignItems: "center", // Centraliza o texto horizontalmente
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default BiometricHeaderMolecule;

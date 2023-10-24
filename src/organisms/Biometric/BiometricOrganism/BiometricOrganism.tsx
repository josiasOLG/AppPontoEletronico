import React from "react";
import { StyleSheet, View } from "react-native";
import BiometricHeaderMolecule from "../../../molecules/Biometric/BiometricHeaderMolecule/BiometricHeaderMolecule";
import BiometricContentMolecule from "../../../molecules/Biometric/BiometricContentMolecule/BiometricContentMolecule";
import { LinearGradient } from "expo-linear-gradient";

interface BiometricOrganismProps {
  onAuthenticate: () => void;
  onAnimationFinish: () => void;
}

const BiometricOrganism: React.FC<BiometricOrganismProps> = ({
  onAuthenticate,
  onAnimationFinish,
}) => {
  return (
    <View style={styles.container}>
      <BiometricHeaderMolecule onAuthenticate={onAuthenticate} />
      <BiometricContentMolecule onAnimationFinish={onAnimationFinish} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

});
export default BiometricOrganism;

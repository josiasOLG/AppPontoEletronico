import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Wave from "../../svg/Wave";
import LoginFormMolecules from "../../molecules/LoginFormMolecules/LoginFormMolecules";
import { LinearGradient } from "expo-linear-gradient";
interface LoginSectionProps {
  handleChange: (field: string) => (text: string) => void;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any) => void;
  values: {
    username: string;
    password: string;
    enableBiometry: boolean;
  };
}

const LoginSectionMolecules: React.FC<LoginSectionProps> = (props) => {
  return (
    <LinearGradient
      colors={["#34AADC", "#0A617C", "#007AFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.containerCenter}
    >
      {/* <Wave/> */}
      <View style={styles.topBack}>
        <View style={styles.card}></View>
      </View>
      <View style={styles.backWhite}>
        <LoginFormMolecules {...props} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
  },
  topBack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "70%",
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
  },
  backWhite: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 50,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
});

export default LoginSectionMolecules;

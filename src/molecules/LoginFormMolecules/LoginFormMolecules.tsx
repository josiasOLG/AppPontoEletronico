import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { LinearGradient } from "expo-linear-gradient";

interface LoginFormProps {
  handleChange: (field: string) => (text: string) => void;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any) => void;
  values: {
    username: string;
    password: string;
    enableBiometry: boolean;
  };
}

const LoginFormMolecules: React.FC<LoginFormProps> = ({
  handleChange,
  handleSubmit,
  setFieldValue,
  values,
}) => {
  return (
    <View>
      <CustomInput
        placeholder="Nome de Usuário"
        onChangeText={handleChange("username")}
        value={values.username}
      />
      <CustomInput
        placeholder="Senha"
        onChangeText={handleChange("password")}
        value={values.password}
        secureTextEntry
      />
      <LinearGradient
        colors={["#AF1B3F", "#272838"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ButtonAtom style={styles.button} onPress={handleSubmit}>
          <TextAtom text="Fazer login" style={styles.buttonText}/>
        </ButtonAtom>
      </LinearGradient>

      <View style={styles.biometryContainer}>
        <Text style={styles.colorWhite}>Habilitar Biometria</Text>
        <Switch
          value={values.enableBiometry}
          onValueChange={(value) => {
            setFieldValue("enableBiometry", value);
          }}
          trackColor={{ false: "#EDF2F4", true: "#AF1B3F" }}
          thumbColor={values.enableBiometry ? "#AF1B3F" : "#EDF2F4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  biometryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorWhite: { color: "#fff" },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginFormMolecules;

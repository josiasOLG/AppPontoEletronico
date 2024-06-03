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
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <TextAtom text="Login " style={styles.login} />
      </View>
      <View style={styles.containerBody}>
        <View>
          <TextAtom text="Usuário" style={styles.textInput} />
          <CustomInput
            iconName={"user-circle"}
            iconSize={16}
            iconColor="#AFAFAF"
            iconLibrary={"FontAwesome"}
            placeholder="Nome de Usuário"
            onChangeText={handleChange("username")}
            value={values.username}
          />
        </View>
        <View>
          <TextAtom text="Senha" style={styles.textInput} />
          <CustomInput
            iconName={"lock"}
            iconSize={16}
            iconColor="#AFAFAF"
            iconLibrary={"FontAwesome"}
            placeholder="Senha"
            onChangeText={handleChange("password")}
            value={values.password}
            secureTextEntry
          />
          {/* <View style={styles.erro}>
            <TextAtom text="Erro - Senha/login" style={styles.colorRed} />
          </View> */}
        </View>
        <View style={styles.containerBtn}>
          <ButtonAtom
            style={[styles.button, styles.backAzul]}
            onPress={handleSubmit}
          >
            <TextAtom text="Fazer login" style={styles.buttonText} />
          </ButtonAtom>
          {/* <ButtonAtom
            style={[styles.button, styles.backOutlineVermelho]}
            onPress={handleSubmit}
          >
            <TextAtom
              text="Cancelar"
              style={[styles.buttonText, styles.colorRed]}
            />
          </ButtonAtom> */}
          <Switch
            value={values.enableBiometry}
            onValueChange={(value) => {
              setFieldValue("enableBiometry", value);
            }}
            trackColor={{ false: "#2B89B0", true: "#AF1B3F" }}
            thumbColor={values.enableBiometry ? "#AF1B3F" : "#2B89B0"}
          />
        </View>

        <View style={styles.linha}></View>

        <View style={styles.containerFooter}>
          <View style={styles.center}>
            <View style={styles.circleEmpty}></View>
            <View style={styles.circleEmpty}></View>
            <View style={styles.circleEmpty}></View>
            <View style={styles.circleEmpty}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBody: {
    flex: 4,
  },
  containerBtn: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  containerFooter: {
    alignItems: "center",
    verticalAlign: "center",
  },
  center: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
  },
  textInput: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 5,
  },
  circleEmpty: {
    width: 55,
    height: 55,
    backgroundColor: "#BABABA",
    flex: 1,
    borderRadius: 50,
  },
  erro: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  inputClass: {
    // borderRadius: 20,
  },
  linha: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginVertical: 30,
  },
  login: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2B89B0",
  },
  biometryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorWhite: { color: "#fff" },
  button: {
    borderRadius: 15,
    flex: 1,
    padding: 10,
  },
  backAzul: {
    backgroundColor: "#34AADC",
  },
  backOutlineVermelho: {
    backgroundColor: "transparent",
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  colorRed: {
    color: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginFormMolecules;

import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueDark,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextoBody: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textBody: {
    fontSize: 30,
    color: Colors.white,
  },
  textBody2: {
    fontSize: 24,
    color: Colors.white,
    marginTop: 20,
  },
  image: {
    width: "100%", // Ajuste conforme necessário
    height: "50%", // Ajuste conforme necessário
    resizeMode: "contain",
  },
  contentButton: {
    marginTop: 40,
    width: "100%",
    flex: 0.2,
  },
  viewRounded: {
    width: 170,
    height: 170,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: Colors.blue,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  viewRoundedBiometria: {
    width: 130,
    height: 130,
    borderRadius: 80,
    overflow: "hidden",
    backgroundColor: Colors.blue,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.white,
  },
  fullWidthButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

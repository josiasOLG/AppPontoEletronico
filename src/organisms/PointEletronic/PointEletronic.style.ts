import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%", // Ajuste conforme necessário
    height: "50%", // Ajuste conforme necessário
    resizeMode: "contain",
  },
  contentButton: {
    marginTop: 40,
    width: "100%",
  },
  fullWidthButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  fullWidthButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

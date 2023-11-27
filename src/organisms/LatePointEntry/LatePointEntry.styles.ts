import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: '100%'
  },
  inputStyle: {
    backgroundColor: Colors.black, // Considere usar uma cor mais suave se aplicável
    color: Colors.white, // Cor do texto para contraste com o fundo escuro
    paddingVertical: 12, // Padding vertical mais adequado para altura de 60
    paddingHorizontal: 20, // Padding horizontal para o texto não começar exatamente na borda
    width: "100%",
    height: 60,
    borderRadius: 30, // Bordas arredondadas
    borderWidth: 1, // Adiciona uma borda sutil
    borderColor: "#ffffff30", // Cor da borda (branca com transparência)
    fontSize: 16, // Tamanho do texto
    fontWeight: "500", // Peso do texto
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Direção e distância da sombra
    shadowOpacity: 0.25, // Transparência da sombra
    shadowRadius: 3.84, // Suavidade da sombra
    elevation: 5, // Elevação no Android para sombra
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
    padding: 20,
    borderRadius: 100,
    width: "100%",
    marginTop: 20,
  },
  fullWidthButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

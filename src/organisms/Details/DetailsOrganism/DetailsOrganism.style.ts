import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export const styles = StyleSheet.create({
  gridItem: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 60,
  } as ViewStyle,
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
  gridItemTextCenter: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  dataHoraText: {
    color: "#fff",
    fontSize: 18,
  } as TextStyle,
  dataHora: {
    color: "#EDF2F4",
    fontSize: 30,
    fontWeight: "900",
  } as TextStyle,
});

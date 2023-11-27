import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import IconGroupMolecule from "../IconGroupMolecule/IconGroupMolecule";
import ButtonAtom from "../../../atoms/ButtonAtom/ButtonAtom";
import { useSelector } from "react-redux";

interface CardTransparentMoleculeProps {
  title: string;
}


const CardTransparentMolecule: React.FC<CardTransparentMoleculeProps> = ({
  title,
}) => {
  const status = useSelector((state: any) => state.timeCircle.statusText);
  const isButtonEnabled = useSelector(
    (state: any) => state.timeCircle.buttonEnabled
  );

  const icons = [
    { name: "apple", color: "#e3e3e3" },
    { name: "android", color: "#e3e3e3" },
    { name: "windows", color: "#e3e3e3" }
  ]

  return (
    <View style={styles.cardTransparent}>
      <TextAtom
          text={status ? status : title}
          style={styles.cardText}
        />
        <IconGroupMolecule icons={icons} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardTransparent: {
    flex: 0.48,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 10,
    height: 150,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  } as ViewStyle,
  cardText: {
    color: "#e3e3e3",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  } as TextStyle,
});

export default CardTransparentMolecule;

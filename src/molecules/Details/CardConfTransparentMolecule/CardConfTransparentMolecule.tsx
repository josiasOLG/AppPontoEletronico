import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import IconGroupMolecule from "../IconGroupMolecule/IconGroupMolecule";
import ButtonAtom from "../../../atoms/ButtonAtom/ButtonAtom";
import { useSelector } from "react-redux";
import NavigationService from "../../../routes/NavigationService";

interface CardTransparentMoleculeProps {
  title: string;
  dataArray: any;
  activeTab: string;
}

const CardConfTransparentMolecule: React.FC<CardTransparentMoleculeProps> = ({
  title,
  dataArray,
  activeTab,
}) => {
  const status = useSelector((state: any) => state.timeCircle.statusText);
  const isButtonEnabled = useSelector(
    (state: any) => state.timeCircle.buttonEnabled
  );

  const register = () => {
    NavigationService.navigate("CameraPoint", {
      param: { activeTab: activeTab },
    });
  };

  const icons = [
    { name: "apple", color: !isButtonEnabled ? "#333" : "#e3e3e3" },
    { name: "android", color: !isButtonEnabled ? "#333" : "#e3e3e3" },
    { name: "windows", color: !isButtonEnabled ? "#333" : "#e3e3e3" },
  ];

  return (
    <ButtonAtom
      style={[
        styles.cardTransparent,
        isButtonEnabled ? styles.disabled : styles.enabled,
      ]}
      onPress={register}
      disabled={isButtonEnabled}
    > 
      <TextAtom text={title} style={[
          styles.cardText,
          isButtonEnabled ? styles.textDisabled : styles.textEnabled,
        ]} />
      <IconGroupMolecule icons={icons} />
    </ButtonAtom>
  );
};

const styles = StyleSheet.create({
  cardTransparent: {
    flex: 0.48,
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
    color: "#87fdef",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  } as TextStyle,
  enabled: {
    borderColor: "#273b44",
    backgroundColor: "#fff",
  },
  disabled: {
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    opacity: 0.1,
  },
  textEnabled: {
    color: "#333",
  },
  textDisabled: {
    color: "#e3e3e3",
  },
});

export default CardConfTransparentMolecule;

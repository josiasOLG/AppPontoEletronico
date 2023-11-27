import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import PercentageCircle from "../../../atoms/PercentageCircle/PercentageCircle";
import TimeCircle from "../../../atoms/TimeCircle/TimeCircle";
import CardTransparentMolecule from "../../Details/CardTransparentMolecule/CardTransparentMolecule"; // Importe o CardTransparentMolecule
import CardConfTransparentMolecule from "../CardConfTransparentMolecule/CardConfTransparentMolecule";

interface CardSolidMoleculeProps {
  title: string;
  type: "percentage" | "time";
  value: number;
  size: number;
  botao: any; // Certifique-se de que este tipo está correto para as propriedades esperadas pelo CardTransparentMolecule
  activeTab: string;
}

const CardSolidMolecule: React.FC<CardSolidMoleculeProps> = ({
  title,
  type,
  value,
  size,
  botao,
  activeTab
}) => {
  return (
    <View style={styles.container}>
      {type === "percentage" ? (
        <>
          <View style={styles.cardSolid}>
            <TextAtom text={title} style={styles.cardTextSolid} />
            <View>
              <PercentageCircle percentage={value} size={size} />
            </View>
          </View>
          <View style={styles.cardButtom}>
            <CardConfTransparentMolecule {...botao} activeTab={activeTab}/>
          </View>
        </>
      ) : type === "time" ? (
        <>
          <View style={styles.cardSolid}>
            <TextAtom text={title} style={styles.cardTextSolid} />
            <View>
              <TimeCircle
                size={size}
                minutes={value}
              />
            </View>
          </View>
          <View style={styles.cardButtom}>
            <CardTransparentMolecule {...botao}  />
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardSolid: {
    backgroundColor: "#0a1823",
    borderRadius: 10,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    height: 240,
    marginBottom: 20,
    marginHorizontal: 5,
  } as ViewStyle,
  cardButtom: {
    marginHorizontal: 5,
    height: 180,
  },
  cardTextSolid: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  } as TextStyle,
});

export default CardSolidMolecule;

import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import TextAtom from '../../../atoms/TextAtom/TextAtom';
import PercentageCircle from '../../../atoms/PercentageCircle/PercentageCircle';
import TimeCircle from '../../../atoms/TimeCircle/TimeCircle';

interface CardSolidMoleculeProps {
  title: string;
  type: 'percentage' | 'time';
  value: number;
  size: number;
}

const styles = StyleSheet.create({
  cardSolid: {
    flex: 0.48,
    backgroundColor: "#0a1823",
    borderRadius: 10,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    height: 240,
    marginBottom: 20,
  } as ViewStyle,
  cardTextSolid: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  } as TextStyle,
});

const CardSolidMolecule: React.FC<CardSolidMoleculeProps> = ({ title, type, value, size }) => {
  return (
    <View style={styles.cardSolid}>
      <TextAtom text={title} style={styles.cardTextSolid} />
      <View>
        {type === 'percentage' && <PercentageCircle percentage={value} size={size} />}
        {type === 'time' && <TimeCircle size={size} minutes={value} />}
      </View>
    </View>
  );
};

export default CardSolidMolecule;

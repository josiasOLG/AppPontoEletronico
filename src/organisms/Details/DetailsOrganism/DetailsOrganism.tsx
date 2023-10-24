import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import CardSolidMolecule from '../../../molecules/Details/CardSolidMolecule/CardSolidMolecule';
import CardTransparentMolecule from '../../../molecules/Details/CardTransparentMolecule/CardTransparentMolecule';
import TextAtom from '../../../atoms/TextAtom/TextAtom';

interface IconProps {
  name: string;
  color: string;
}

interface CardSolidProps {
  title: string;
  type: 'percentage' | 'time';
  value: number;
  size: number;
}

interface CardTransparentProps {
  title: string;
  icons: IconProps[];
}

const styles = StyleSheet.create({
  gridItem: {
    width: "100%",
    padding: 10,
  } as ViewStyle,
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
  gridItemTextCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  } as ViewStyle,
  dataHoraText: {
    color: "#fff",
    fontSize: 18,
  } as TextStyle,
  dataHora: {
    color: "#24fd88",
    fontSize: 30,
    fontWeight: '900'
  } as TextStyle,
});

const DetailsOrganism: React.FC = () => {
  const cardSolidData: CardSolidProps[] = [
    {
      title: "Área Autorizada",
      type: "percentage",
      value: 10,
      size: 100
    },
    {
      title: "Tempo para liberação",
      type: "time",
      value: 15,
      size: 110
    }
  ];

  const cardTransparentData: CardTransparentProps[] = [
    {
      title: "CONFIRMAR",
      icons: [
        { name: "apple", color: "#e3e3e3" },
        { name: "android", color: "#e3e3e3" },
        { name: "windows", color: "#e3e3e3" }
      ]
    },
    {
      title: "AGUARDAR",
      icons: [
        { name: "apple", color: "#87fdef" },
        { name: "android", color: "#87fdef" },
        { name: "windows", color: "#87fdef" }
      ]
    }
  ];

  return (
    <View style={styles.gridItem}>
      <View style={styles.cardRow}>
        {cardSolidData.map((data, index) => (
          <CardSolidMolecule key={index} {...data} />
        ))}
      </View>
      <View style={styles.cardRow}>
        {cardTransparentData.map((data, index) => (
          <CardTransparentMolecule key={index} {...data} />
        ))}
      </View>
      <View style={styles.gridItemTextCenter}>
        <TextAtom text="Data e hora - Pegada" style={styles.dataHoraText} />
        <TextAtom text="23/01/2023 12:00" style={styles.dataHora} />
      </View>
    </View>
  );
}

export default DetailsOrganism;

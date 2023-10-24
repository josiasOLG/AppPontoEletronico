import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import TextAtom from '../../../atoms/TextAtom/TextAtom';
import IconGroupMolecule from '../IconGroupMolecule/IconGroupMolecule';
import { Icon } from '../IconGroupMolecule/IconGroupMolecule'; // Importar a interface Icon se estiver em outro arquivo

interface CardTransparentMoleculeProps {
  title: string;
  icons: Icon[];
}

const styles = StyleSheet.create({
  cardTransparent: {
    flex: 0.48,
    borderColor: "#273b44",
    borderWidth: 1,
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 10,
    height: 150,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  } as ViewStyle,
  cardText: {
    color: "#87fdef",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  } as TextStyle,
});

const CardTransparentMolecule: React.FC<CardTransparentMoleculeProps> = ({ title, icons }) => {
  return (
    <View style={styles.cardTransparent}>
      <TextAtom text={title} style={styles.cardText} />
      <IconGroupMolecule icons={icons} />
    </View>
  );
};

export default CardTransparentMolecule;

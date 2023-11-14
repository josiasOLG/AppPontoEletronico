import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import CardSolidMolecule from '../../../molecules/Details/CardSolidMolecule/CardSolidMolecule';
import CardTransparentMolecule from '../../../molecules/Details/CardTransparentMolecule/CardTransparentMolecule';
import TextAtom from '../../../atoms/TextAtom/TextAtom';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface IconProps {
  name: string;
  color: string;
}

interface CardSolidProps {
  title: string;
  type: 'percentage' | 'time';
  value: number;
  size: number;
  botao: any;
}

interface CardTransparentProps {
  title: string;
  icons: IconProps[];
}



const DetailsOrganism: React.FC<any> = () => {
  const motoristaData = useSelector((state: any) => state.motorista.motoristaData);
  let tempoParaLiberacao = 0; // valor padrão
  if (motoristaData) {
    const dataEntrada = new Date();
    const dataSaida = new Date(motoristaData.DataEntradaProgramada);
    const diff = dataSaida.getTime() - dataEntrada.getTime();
        tempoParaLiberacao = Math.floor(diff / (1000 * 60));
  }

  const cardSolidData: CardSolidProps[] = [
    {
      title: "Área Autorizada",
      type: "percentage",
      value: 10,
      size: 130,
      botao: {
        title: "CONFIRMAR",
      }
    },
    {
      title: "Tempo para liberação",
      type: "time",
      value: tempoParaLiberacao,
      size: 130,
      botao: {
        title: "AGUARDAR"
      }
    }
  ];

  return (
    <View style={styles.gridItem}>
      <View style={styles.cardRow}>
        {cardSolidData.map((data, index) => (
          <CardSolidMolecule key={index} {...data} />
        ))}
      </View>
      <View style={styles.gridItemTextCenter}>
        <TextAtom text="Data e hora - Pegada" style={styles.dataHoraText} />
        <TextAtom text="23/01/2023 12:00" style={styles.dataHora} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default DetailsOrganism;

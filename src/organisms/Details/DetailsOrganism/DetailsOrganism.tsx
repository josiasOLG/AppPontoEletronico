import React, {useEffect} from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import CardSolidMolecule from "../../../molecules/Details/CardSolidMolecule/CardSolidMolecule";
import CardTransparentMolecule from "../../../molecules/Details/CardTransparentMolecule/CardTransparentMolecule";
import TextAtom from "../../../atoms/TextAtom/TextAtom";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setButtonStatus, setStatusText } from "../../../redux/actions/timeCircle.actions";
import { formatarData } from "../../../Utils/Utils";
import  { styles } from "./DetailsOrganism.style"
import useMotoristaData from "../../../hook/useMotoristaData";

interface IconProps {
  name: string;
  color: string;
}

interface CardSolidProps {
  title: string;
  type: "percentage" | "time";
  value: number;
  size: number;
  botao: any;
}

interface CardTransparentProps {
  title: string;
  icons: IconProps[];
}

const DetailsOrganism: React.FC<any> = ({ activeTab }) => {
  const motoristaData = useSelector(
    (state: any) => state.motorista.motoristaData
  );
  const dispatch = useDispatch();

  const { tempoParaLiberacao, dataProgramada } = useMotoristaData(activeTab, motoristaData);

  const cardSolidData: CardSolidProps[] = [
    {
      title: "Área Autorizada",
      type: "percentage",
      value: 10,
      size: 130,
      botao: {
        title: "CONFIRMAR",
      },
    },
    {
      title: "Tempo para liberação",
      type: "time",
      value: tempoParaLiberacao,
      size: 130,
      botao: {
        title: "AGUARDAR",
      },
    },
  ];

  return (
    <View style={styles.gridItem}>
      <View style={styles.cardRow}>
        {cardSolidData.map((data, index) => (
          <CardSolidMolecule activeTab={activeTab} key={index} {...data} />
        ))}
      </View>
      <View style={styles.gridItemTextCenter}>
        <TextAtom text="Data e hora - Pegada" style={styles.dataHoraText} />
        <TextAtom text={formatarData(dataProgramada)} style={styles.dataHora} />
      </View>
    </View>
  );
};



export default DetailsOrganism;

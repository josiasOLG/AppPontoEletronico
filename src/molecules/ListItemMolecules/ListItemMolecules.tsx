import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";

type ListItemProps = {
  item: any;
  onOptionClick: (item: any) => void;
  handleOptionClick:  (item: any) => void;
};

const ListItemMolecules: React.FC<ListItemProps> = ({
  item,
  onOptionClick,
  handleOptionClick,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ButtonAtom onPress={() => {
      onOptionClick(item);
    }}>
      <View style={styles.listItem}>
        <View>
          <TextAtom style={styles.listItemText} text={item.LocalEntradaProgramado ? item.LocalEntradaProgramado : item.Descricao === 'folga' ? 'Dia de folga' : ''}/>
          <View style={styles.textoItem}>
            <Text
              style={styles.listItemSubText}
            >
              {`Hora inicio: ${formatTime(item.DataEntradaProgramada)}`}
            </Text>
            <Text
              style={styles.listItemSubTextEnd}
            >
              {`Hora fim: ${formatTime(item.DataSaidaProgramada)}`}
            </Text>
          </View>
        </View>
        <View style={styles.icons}>
          <ButtonAtom
            style={styles.optionButton}
            onPress={() => handleOptionClick(item)}
          >
            <IconAtom name="card-outline" size={24} color="#fff" library="Ionicons"/>
          </ButtonAtom>
        </View>
      </View>
    </ButtonAtom>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#20B2AA",
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textoItem: {
    flex: 1,
  },
  listItemText: {
    color: "#fff",
    fontSize: 16,
  },
  listItemSubText: {
    color: "#aaa",
    fontSize: 12,
    marginVertical: 5,
  },
  listItemSubTextEnd: {
    color: "#aaa",
    fontSize: 12,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
  },
});

export default ListItemMolecules;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import MotoristaDTO from "../../api/dtos/MotoristaDTO";

type ListItemProps = {
  item: MotoristaDTO;
  onOptionClick: (item: any) => void;
  handleOptionClick:  (item: any) => void;
};

const ListItemMolecules: React.FC<ListItemProps> = ({
  item,
  onOptionClick,
  handleOptionClick,
}) => {
  return (
    <ButtonAtom onPress={() => onOptionClick(item)}>
      <View style={styles.listItem}>
        <View>
          <TextAtom style={styles.listItemText} text={item.Descricao}/>
          <View style={styles.textoItem}>
            <Text
              style={styles.listItemSubText}
            >{`Hora inicio: ${item.Data}`}</Text>
            <Text
              style={styles.listItemSubTextEnd}
            >{`Hora fim: ${item.DateDeleted}`}</Text>
          </View>
        </View>
        <View style={styles.icons}>
          <ButtonAtom
            style={styles.optionButton}
            onPress={() => handleOptionClick(item)}
          >
            <IconAtom name="card-outline" size={24} color="white" library="Ionicons"/>
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
    borderBottomColor: "#ccc",
    marginBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textoItem: {
    flex: 1,
    flexDirection: "row",
  },
  listItemText: {
    color: "#fff",
    fontSize: 16,
  },
  listItemSubText: {
    color: "#aaa",
    fontSize: 12,
  },
  listItemSubTextEnd: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 10,
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

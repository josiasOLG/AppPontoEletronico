import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles";
import { formatarData2 } from "../../Utils/Utils";

type ListItemProps = {
  item: any;
  onOptionClick: (item: any) => void;
  handleOptionClick: (item: any) => void;
  activeTab?: string;
};

const ListItemMolecules: React.FC<ListItemProps> = ({
  item,
  onOptionClick,
  handleOptionClick,
  activeTab,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const isDisabled = item.BateuPonto === 1;
  const linearGradientColors = isDisabled
    ? [Colors.orange, Colors.orange]
    : [Colors.white, Colors.white];

  // console.log(item);

  return (
    <ButtonAtom
      onPress={() => {
        if (!isDisabled) {
          onOptionClick(item);
        }
      }}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={linearGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.listItem}
      >
        <View>
          <TextAtom
            style={styles.listItemText}
            text={
              item.LocalEntradaProgramado
                ? 'Local: ' + item.LocalEntradaProgramado
                : item.Descricao === "folga"
                ? "Dia de folga"
                : ""
            }
          />
          <View style={styles.textoItem}>
            {activeTab == "Entrada" && (
              <>
                <Text style={styles.listItemSubText}>
                  {`Hora inicio: ${formatTime(item.HoraInicioProgramada)}`}
                </Text>
                <Text style={styles.listItemSubTextEnd}>
                  {`Data entrada: ${formatarData2(
                    new Date(item.HoraInicioProgramada)
                  )}`}
                </Text>
              </>
            )}

            {activeTab == "Folga" && (
              <>
                <Text style={styles.listItemSubText}>
                  {`Hora inicio: ${formatTime(item.DataFolgaProgramada)}`}
                </Text>
                <Text style={styles.listItemSubTextEnd}>
                  {`Data folga: ${formatarData2(
                    new Date(item.DataFolgaProgramada)
                  )}`}
                </Text>
              </>
            )}

            {activeTab == "Saida" && (
              <>
                <Text style={styles.listItemSubText}>
                  {`Hora inicio: ${formatTime(item.HoraFimProgramada)}`}
                </Text>
                <Text style={styles.listItemSubTextEnd}>
                  {`Data Saida: ${formatarData2(
                    new Date(item.HoraFimProgramada)
                  )}`}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.icons}>
          {/* {(!isDisabled && 
            <ButtonAtom
              style={styles.optionButton}
              onPress={() => handleOptionClick(item)}
            >
              <IconAtom
                name="card-outline"
                size={24}
                color={Colors.black}
                library="Ionicons"
              />
            </ButtonAtom>
          )} */}
        </View>
      </LinearGradient>
    </ButtonAtom>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "# ",
    borderBottomWidth: 2,
    borderBottomColor: Colors.red,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textoItem: {
    flex: 1,
  },
  listItemText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "900",
  },
  listItemSubText: {
    color: Colors.black,
    fontSize: 12,
    marginVertical: 5,
  },
  listItemSubTextEnd: {
    color: Colors.black,
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

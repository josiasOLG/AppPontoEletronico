import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles";
import { formatarData2, remFontSize } from "../../Utils/Utils";
import AlarmeSVG from "../../atoms/SVG/AlarmeSvg";
import RelogioSvg from "../../atoms/SVG/RelogioSvg";
import EntrarSvg from "../../atoms/SVG/EntrarSvg";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

  const isDisabled = item.BateuPonto === true;

  const linearGradientColors = isDisabled
    ? [Colors.purple, Colors.purple]
    : [Colors.white, Colors.white];

  let color;

  if (activeTab === "Entrada") {
    color = Colors.blueDark;
  } else if (activeTab === "Saida") {
    color = Colors.red;
  } else if (activeTab === "Folga") {
    color = Colors.purple;
  } else {
    // Cor padrão se nenhuma das condições acima for verdadeira
    color = Colors.blueDark;
  }

  return (
    <View style={[styles.listItem, { borderColor: color }]}>
      <View style={styles.flexBody}>
        <View style={styles.flexContainer}>
          <Text
            style={styles.listItemText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Serviço: {item.ServicoEscala?.NomeServico}
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.listItemText}
          >
            Carro: {item.ServicoEscala?.NomeServico}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.localText}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.boldText}
            >
              Local:
            </Text>{" "}
            {item?.Perimetro?.Nome}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <View style={styles.flexText}>
          <View style={styles.col12}>
            {activeTab == "Entrada" && (
              <View style={styles.flexContainer}>
                <View style={styles.iconWithText}>
                  <AlarmeSVG width={20} height={20} color={color} />
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.iconText}
                  >
                    {formatarData2(new Date(item.HoraInicioProgramada))}
                  </Text>
                </View>
                <View style={styles.iconWithText}>
                  <RelogioSvg width={20} height={20} color={color} />
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.iconText}
                  >
                    {formatTime(item.HoraInicioProgramada)}
                  </Text>
                </View>
              </View>
            )}

            {activeTab == "Folga" && (
              <>
                <View style={styles.flexContainer}>
                  <View style={styles.iconWithText}>
                    <AlarmeSVG width={20} height={20} color={color} />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.iconText}
                    >
                      {formatarData2(new Date(item.DataFolgaProgramada))}
                    </Text>
                  </View>
                  <View style={styles.iconWithText}>
                    <RelogioSvg width={20} height={20} color={color} />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.iconText}
                    >
                      {formatTime(item.DataFolgaProgramada)}
                    </Text>
                  </View>
                </View>
              </>
            )}

            {activeTab == "Saida" && (
              <>
                <View style={styles.flexContainer}>
                  <View style={styles.iconWithText}>
                    <AlarmeSVG width={20} height={20} color={color} />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.iconText}
                    >
                      {formatarData2(new Date(item.HoraFimProgramada))}
                    </Text>
                  </View>
                  <View style={styles.iconWithText}>
                    <RelogioSvg width={20} height={20} color={color} />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.iconText}
                    >
                      {formatTime(item.HoraFimProgramada)}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <View style={styles.col12}>
            {!isDisabled && (
              <>
                <ButtonAtom
                  onPress={() => {
                    onOptionClick(item);
                  }}
                  style={[styles.btn, { backgroundColor: color }]}
                >
                  <EntrarSvg />
                </ButtonAtom>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexBody: {
    flex: 2,
  },
  icons: {
    flex: 1,
    borderLeftWidth: 2,
    paddingLeft: 10,
  },
  flexContainer: {
    flex: 1,
    gap: 10,
  },
  flexText: { flex: 1 },
  iconWithText: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 8,
  },
  iconText: {
    marginLeft: 4,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "# ",
    borderWidth: 3,
    borderColor: Colors.red,
    marginBottom: 10,
    borderRadius: 10,
  },
  listItemActive: {
    backgroundColor: "red",
  },
  textoItem: {
    flex: 1,
  },
  listItemText: {
    color: Colors.black,
    fontWeight: "900",
  },
  listItemSubText: {
    color: Colors.black,
    marginTop: 10,
  },
  listItemSubTextEnd: {
    color: Colors.black,
  },
  boldText: { fontWeight: "700" },
  optionButton: {
    padding: 10,
  },
  localText: { marginTop: 10 },
  btn: {
    width: 35,
    height: 35,
    backgroundColor: Colors.red,
    position: "absolute",
    right: -18,
    bottom: -18,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  col12: { flex: 1 },
});

export default ListItemMolecules;

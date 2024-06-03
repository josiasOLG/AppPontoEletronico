import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../styles";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import EmergenciaSvg from "../../atoms/SVG/EmergenciaSvg";
import RefreshSvg from "../../atoms/SVG/RefreshSvg";
import NavigationService from "../../routes/NavigationService";
import { useDispatch } from "react-redux";
import { setMotoristaData } from "../../redux/actions/motoristaActions";
import { atualizarTempoRestante } from "../../Utils/Utils";

interface PontoInfoProps {
  isInsidePerimeter: boolean;
  item: any;
  activeTab: any;
}

const PontoInfoOrganism: React.FC<PontoInfoProps> = ({
  isInsidePerimeter,
  item,
  activeTab,
}) => {
  const [podeBaterPonto, setPodeBaterPonto] = useState(true);
  const [tempoRestanteTexto, setTempoRestanteTexto] = useState("");
  const [atrasado, setAtrasado] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateInterval = setInterval(() => {
      atualizarTempoRestante(
        item,
        activeTab,
        setPodeBaterPonto,
        setTempoRestanteTexto,
        setAtrasado
      );
    }, 60000); // Update every minute

    // Initial update
    atualizarTempoRestante(
      item,
      activeTab,
      setPodeBaterPonto,
      setTempoRestanteTexto,
      setAtrasado
    );

    return () => clearInterval(updateInterval); // Cleanup interval on unmount
  }, [activeTab, item]);

  const handleRegister = () => {
    NavigationService.navigate("CameraPoint", { param: { activeTab } });
  };

  return (
    <View
      style={[
        styles.containerPonto,
        (!isInsidePerimeter || !podeBaterPonto) && styles.containerPontoOutside,
      ]}
    >
      <View style={styles.pontoTextoContainer}>
        <View style={styles.infoLocal}>
          <TextAtom
            style={styles.textInfo}
            text={`Tempo até o ponto: ${tempoRestanteTexto}`}
          />
        </View>
      </View>
      <View style={styles.pontoTextoContainer}>
        <View style={styles.infoBotao}>
          <ButtonAtom style={styles.btnBorder} disabled={!isInsidePerimeter}>
            <EmergenciaSvg />
          </ButtonAtom>
          <ButtonAtom style={styles.btnBorder} disabled={!isInsidePerimeter}>
            <RefreshSvg />
          </ButtonAtom>
        </View>
        <View style={styles.infoDistancia}>
          <ButtonAtom
            style={[
              styles.btnPonto,
              (!isInsidePerimeter || !podeBaterPonto) &&
                styles.btnPontoInactive,
            ]}
            onPress={handleRegister}
            disabled={!isInsidePerimeter || !podeBaterPonto}
          >
            <TextAtom style={styles.textBtnPonto} text="Bater ponto" />
          </ButtonAtom>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPonto: {
    position: "absolute",
    width: "92%",
    bottom: 100,
    backgroundColor: "#0275E4",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  pontoTextoContainer: {
    flexDirection: "row",
  },
  infoLocal: {
    flex: 1,
  },
  infoDistancia: {
    flex: 1,
    alignItems: "flex-end",
  },
  infoBotao: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  btnBorder: {
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  textInfo: {
    color: Colors.white,
  },
  textBtnPonto: {
    color: Colors.white,
  },
  btnPonto: {
    backgroundColor: "#0054AF",
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginTop: 20,
    alignItems: "center",
  },
  containerPontoOutside: {
    backgroundColor: "#0054AF",
  },
  btnPontoInactive: {
    opacity: 0.5,
  },
});

export default PontoInfoOrganism;

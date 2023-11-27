// ModalComponentOrganism.tsx

import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { LinearGradient } from "expo-linear-gradient";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const ModalComponentOrganism: React.FC<ModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ButtonAtom
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <IconAtom name="close" size={24} color="#333" />
          </ButtonAtom>
          <TextAtom
            text="Registrar ponto eletronico"
            style={styles.modalText}
          />
          <TextAtom
            text="Faça o seu registro de ponto abaixo clicando no botão"
            style={styles.modalTextSub}
          />
          <LinearGradient
            colors={["#FFA62B", "#272838"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 1 }}
            style={styles.fullWidthButton}
          >
            <ButtonAtom >
              <TextAtom
                text="REGISTRAR PONTO"
                style={styles.fullWidthButtonText}
              />
            </ButtonAtom>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    backgroundColor: "#EDF2F4",
    paddingHorizontal: 20,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "30%",
    alignItems: "center", // Alinha os itens ao centro
  },
  closeButton: {
    alignSelf: "flex-end", // Alinha o botão de fechar ao canto superior direito
    marginTop: 10,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 25,
    color: "#333",
  },
  modalTextSub: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
    color: "#333",
  },
  fullWidthButton: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 8,
    width: "100%",
  },
  fullWidthButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default ModalComponentOrganism;

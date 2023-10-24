// ModalComponentOrganism.tsx

import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import ButtonAtom from '../../atoms/ButtonAtom/ButtonAtom';
import IconAtom from '../../atoms/IconAtom/IconAtom';
import TextAtom from '../../atoms/TextAtom/TextAtom';

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const ModalComponentOrganism: React.FC<ModalProps> = ({ modalVisible, setModalVisible }) => {
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
          <ButtonAtom style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <IconAtom name="close" size={24} color="white" />
          </ButtonAtom>
          <TextAtom  text='Cartão de ponto' style={styles.modalText}/>
          <ButtonAtom style={styles.fullWidthButton}>
            <TextAtom text='REGISTRAR PONTO' style={styles.fullWidthButtonText} />
          </ButtonAtom>
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
    backgroundColor: "#0a1823",
    paddingHorizontal: 20,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "25%",
    alignItems: "center", // Alinha os itens ao centro
  },
  closeButton: {
    alignSelf: "flex-end", // Alinha o botão de fechar ao canto superior direito
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
    color: "#fff",
  },
  fullWidthButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 0,
    width: "100%", // Faz o botão ocupar toda a largura disponível
  },
  fullWidthButtonText: {
    color: "#333",
    textAlign: "center",
    fontSize: 18,
  },
});

export default ModalComponentOrganism;

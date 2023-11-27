import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import {
  fetchAllFromServiceNome,
  syncData,
} from "../../database/sync/SyncService";
import ModalComponentOrganism from "../../organisms/ModalComponentOrganism/ModalComponentOrganism";
import UserSectionOrganism from "../../organisms/UserSectionOrganism/UserSectionOrganism";
import ItemListOrganism from "../../organisms/ItemListOrganism/ItemListOrganism";
import NavigationService from "../../routes/NavigationService";
import SyncMolecules from "../../molecules/SyncMolecules/SyncMolecules";
import {
  showErrorToast,
  showSuccessToast,
} from "../../redux/actions/error.actions";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import { useFocusEffect } from "@react-navigation/native";
import { setMotoristaData } from "../../redux/actions/motoristaActions";
import { Colors } from "../../styles";
import { ordenarPorDatasProximas } from "../../Utils/Utils";
import TextAtom from "../../atoms/TextAtom/TextAtom";

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState("Entrada");
  const [escalaMotorista, setEscalaMotorista] = useState(null);
  const userData = useSelector((state: any) => state.login.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSynced, setDataSynced] = useState(false);

  const dispatch = useDispatch();

  const updateDataBasedOnTab = useCallback(async () => {
    try {
      let data = await fetchAllFromServiceNome(activeTab.toLowerCase());
      data = ordenarPorDatasProximas(data);
      setEscalaMotorista(data);
    } catch (error: any) {
      dispatch(
        showErrorToast("Erro ao buscar escalas dos motoristas", error.message)
      );
    }
  }, [activeTab, dispatch]);

  const handlerClickDetails = (item: any) => {
    dispatch(setMotoristaData(item));
    NavigationService.navigate("Details", { param: activeTab });
  };

  useFocusEffect(
    useCallback(() => {
      updateDataBasedOnTab();
    }, [updateDataBasedOnTab, dataSynced])
  );

  const handleSync = useCallback(async () => {
    try {
      const syncResult = await syncData(userData);
      if (syncResult.status === "success") {
        dispatch(
          showSuccessToast(
            "Sincronização concluída",
            "Dados sincronizados com sucesso!"
          )
        );
        setDataSynced((prev) => !prev);
      } else {
        dispatch(showErrorToast("Sincronização falhou", syncResult.message));
      }
    } catch (error: any) {
      dispatch(showErrorToast("Falha ao obter os dados", error.message));
    }
  }, [userData, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ModalComponentOrganism
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.containerScroll}>
          <StatusBarAtoms
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <LinearGradient
            colors={[Colors.red, Colors.black]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientEffect}
          />
          <UserSectionOrganism />
          <SyncMolecules handleSync={handleSync} />
          <View style={styles.contentTilte}>
            <TextAtom style={styles.title} text={'ESCALA '+activeTab}/>
          </View>
          <ItemListOrganism
            data={escalaMotorista}
            activeTab={activeTab}
            handleItemClick={(item) => handlerClickDetails(item)}
            handleOptionClick={(item: any) => {
              setModalVisible(true);
            }}
          />
        </View>
        <View style={styles.footerTabs}>
          <TouchableOpacity onPress={() => setActiveTab("Entrada")}>
            <IconAtom
              name="home"
              size={30}
              color={activeTab === "Entrada" ? Colors.red : Colors.black}
              library="Ionicons"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("Folga")}>
            <IconAtom
              name="bed"
              size={30}
              color={activeTab === "Folga" ? Colors.red : Colors.black}
              library="Ionicons"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("Saida")}>
            <IconAtom
              name="exit"
              size={30}
              color={activeTab === "Saida" ? Colors.red : Colors.black}
              library="Ionicons"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  containerScroll: {
    flex: 0.65,
    backgroundColor: Colors.black,
    height: 0,
  },
  contentTilte: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 22,
    textTransform: 'uppercase'
  },
  footerTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.gray,
    borderTopWidth: 1,
    borderTopColor: Colors.orange,
    padding: 20,
    paddingHorizontal: 40,
  },
  gradientEffect: {
    position: "absolute",
    width: "100%",
    height: 300,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0,
  },
});

export default Home;

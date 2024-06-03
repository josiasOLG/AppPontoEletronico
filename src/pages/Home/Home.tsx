import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
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
import {
  getCurrentMonthFirstDay,
  getCurrentMonthFirstDay2,
  ordenarPorDatasProximas,
  remFontSize,
} from "../../Utils/Utils";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { getProfile } from "../../secure/secureStoreService";
import HomeAPI from "../../api/motorista/HomeAPI";
import ModalLocal from "../Local/Modal/ModalLocal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

type RootStackParamList = {
  Main: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const { width, height } = Dimensions.get("window");

const Home: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState("Entrada");
  const [selectedMotorista, setSelectedMotorista] = useState(null);
  const [escalaMotorista, setEscalaMotorista] = useState(null);
  const userData = useSelector((state: any) => state.login.userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLocalVisible, setModalLocalVisible] = useState(false);
  const [dataSynced, setDataSynced] = useState(false);
  const baseWidth = 375;
  const baseFontSize = 16;
  const dispatch = useDispatch();

  const updateDataBasedOnTab = useCallback(async () => {
    try {
      const profile = await getProfile();
      const id = profile?.id;
      const dateForAPI = getCurrentMonthFirstDay2();
      let data = await HomeAPI.getInstance().fetchAllFromServiceNomeHomeAPI(
        activeTab.toLowerCase(),
        id,
        profile.firstName,
        encodeURIComponent(dateForAPI)
      );
      data = ordenarPorDatasProximas(data, activeTab.toLowerCase());
      setEscalaMotorista(data);
    } catch (error: any) {
      dispatch(
        showErrorToast("Erro ao buscar escalas dos motoristas", error.message)
      );
    }
  }, [activeTab, dispatch]);

  const handlerClickDetails = (item: any) => {
    dispatch(setMotoristaData(item));
    // setSelectedMotorista(item);
    // setModalLocalVisible(true);
    NavigationService.navigate("ModalLocal", {
      item: item,
      activeTab: activeTab,
    });
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
          <LinearGradient
            colors={["#34AADC", "#0A617C", "#007AFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientEffect}
          >
            <UserSectionOrganism handleSync={handleSync} />
          </LinearGradient>
          <View style={styles.contentBody}>
            <View style={styles.center}>
              {/* <SyncMolecules handleSync={handleSync} /> */}
            </View>

            <View style={styles.contentTilte}>
              <TextAtom
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.title}
                text={"Escala programa"}
              />
            </View>
            <View style={styles.containerFooter}>
              <View
                style={[
                  styles.footerTabs,
                  {
                    backgroundColor:
                      activeTab === "Entrada"
                        ? Colors.blueDark
                        : activeTab === "Saida"
                        ? Colors.red
                        : activeTab === "Folga"
                        ? Colors.purple // Substitua Colors.red pela cor desejada para "Folga"
                        : Colors.blueDark, // Cor padrão caso nenhuma das condições acima seja verdadeira
                  },
                ]}
              >
                <TouchableOpacity onPress={() => setActiveTab("Entrada")}>
                  <TextAtom text="Entrada" style={styles.textTab} />
                  {activeTab === "Entrada" && (
                    <View style={styles.barraSelected} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("Saida")}>
                  <TextAtom text="Saida" style={styles.textTab} />
                  {activeTab === "Saida" && (
                    <View style={styles.barraSelected} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("Folga")}>
                  <TextAtom text="Folga" style={styles.textTab} />
                  {activeTab === "Folga" && (
                    <View style={styles.barraSelected} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerList}>
              <ItemListOrganism
                data={escalaMotorista}
                activeTab={activeTab}
                handleItemClick={(item) => handlerClickDetails(item)}
                handleOptionClick={(item: any) => {
                  // setModalVisible(true);
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerScroll: {
    flex: 1,
  },
  contentBody: {
    flex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 0,
    position: "relative",
    top: -10,
    backgroundColor: Colors.white,
  },
  contentFooter: {
    flex: 0.1,
  },
  contentTilte: {
    paddingHorizontal: width * 0.05, // 5% da largura da tela
    paddingTop: height * 0.02, // 2% da altura da tela
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  containerFooter: {
    flex: 1,
    marginTop: 20,
  },
  containerList: {
    flex: 5,
    height: 5,
  },
  title: {
    color: Colors.black,
    fontWeight: "900",
    fontSize: RFPercentage(3),
    textTransform: "uppercase",
  },
  footerTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingHorizontal: width * 0.1,
  },
  barraSelected: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.white,
  },
  textTab: {
    color: Colors.white,
    fontSize: RFPercentage(3),
  },
  blue: {
    color: Colors.blue,
  },
  gradientEffect: {
    flex: 1,
  },
});

export default Home;

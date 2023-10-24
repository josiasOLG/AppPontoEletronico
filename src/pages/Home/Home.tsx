import React, { useState, useEffect  } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import { fetchAllFromService, syncData } from "../../database/sync/SyncService";
import ModalComponentOrganism from "../../organisms/ModalComponentOrganism/ModalComponentOrganism";
import UserSectionOrganism from "../../organisms/UserSectionOrganism/UserSectionOrganism";
import ItemListOrganism from "../../organisms/ItemListOrganism/ItemListOrganism";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../redux/actions/error.actions";
import { LinearGradient } from "expo-linear-gradient";
import SyncMolecules from "../../molecules/SyncMolecules/SyncMolecules";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../../routes/NavigationService";

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataSynced, setDataSynced] = useState(false);
  const [motorista, setMotorista] = useState<any>();
  const dispatch = useDispatch();
  const handleItemClick = () => {
    NavigationService.navigate("Details");
  }; 

  const handleOptionClick = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const biometric = await AsyncStorage.getItem('biometric');
      console.log(biometric);
    }
  
    authenticateUser();


    const fetchData = async () => {
      try {
        const data = await fetchAllFromService();
        setMotorista(data);
      } catch (error: any) {
        dispatch(showErrorToast("Erro ao buscar escalas dos motoristas", error.message));
      }
    };
    fetchData();
  }, [dataSynced]);


  const handleSync = async () => {
    try {
      await syncData();
      dispatch(showSuccessToast("Sincronização concluida", "Dados sincronizados com sucesso!"));
      setDataSynced(prev => !prev);
    } catch (error: any) {
      dispatch(showErrorToast("Falha ao obter os dados", error.message));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ModalComponentOrganism modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)}/>  
      <View style={styles.container}>
        <StatusBarAtoms backgroundColor="transparent" barStyle="dark-content" />
        <LinearGradient
            colors={['#006400', '#20B2AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientEffect}
          />
        <UserSectionOrganism />
        <SyncMolecules handleSync={handleSync}/>
        <ItemListOrganism data={motorista} 
        handleItemClick={handleItemClick} 
        handleOptionClick={handleOptionClick}/>
      </View>
    </KeyboardAvoidingView>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010818",
  },
  containerFooter: {
    backgroundColor: "#2c2c2c",
    width: "100%",
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  syncIconContainer: {
    marginLeft: 10
  },  
  outerContainer: {
    width: "100%",
    padding: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  iconSpacing: {
    marginLeft: 15,
  },
  profileImageContainer: {
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 12,
  },
  userSection: {
    alignItems: "center",
    backgroundColor: "#234547",
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#ddd",
    fontSize: 14,
  },
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
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
  },
  gradientEffect: {
    position: 'absolute',
    width: '100%',
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

import React, { useCallback, useEffect } from "react";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { syncData } from "../../database/sync/SyncService";
import {
  showErrorToast,
  showSuccessToast,
} from "../../redux/actions/error.actions";
import NavigationService from "../../routes/NavigationService";
import { styles } from "./PointEletronic.style";
import { useTimeVerification } from "../../hook/useTimeVerification";
import LatePointEntry from "../LatePointEntry/LatePointEntry";
import { SafeAreaView } from "react-native-safe-area-context";
import { hideLoading, showLoading } from "../../redux/actions/loadingActions";
import useLocation from "../../hook/useLocation";
import { saveLocation } from "../../secure/secureStoreService";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import { Colors } from "../../styles";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import * as LocalAuthentication from "expo-local-authentication";

interface PointEletronicProps {
  photoUri: string;
  imagem: string;
  param: any;
}

/**
 * Componente PointEletronic responsável por renderizar a tela de ponto eletrônico.
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.photoUri - URI da foto capturada.
 * @param {string} props.imagem - Imagem a ser enviada.
 * @param {Object} props.param - Parâmetros adicionais.
 */
const PointEletronic: React.FC<PointEletronicProps> = ({
  photoUri,
  imagem,
  param,
}) => {
  const motoristaData = useSelector(
    (state: any) => state.motorista.motoristaData
  );
  const userData = useSelector((state: any) => state.login.userData);
  const dispatch = useDispatch();
  const { location } = useLocation();
  const statusText = useSelector((state: any) => state.timeCircle.statusText);

  useEffect(() => {
    if (location) {
      saveLocation(location.coords).catch(console.error);
    }
  }, [location]);

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
        NavigationService.navigate("Main");
      } else {
        dispatch(showErrorToast("Sincronização falhou", syncResult.message));
      }
    } catch (error: any) {
      dispatch(showErrorToast("Falha ao obter os dados", error.message));
    }
  }, [userData, dispatch]);

  const { checkTime, register, selectMetodo } = useTimeVerification(
    motoristaData,
    imagem,
    param,
    handleSync,
    dispatch
  );

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Biometria não disponível",
        "Seu dispositivo não suporta autenticação biométrica ou não está configurada."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticação Biométrica",
      fallbackLabel: "Use a senha",
    });

    if (result.success) {
      register();
    } else {
      Alert.alert(
        "Autenticação falhou",
        "Não foi possível autenticar usando biometria."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {statusText == "EM ANALISE" ? (
          <LatePointEntry photoUri={photoUri} imagem={imagem} param={param} /> // Substitua com o componente que você deseja renderizar
        ) : (
          <>
            {/* <Image source={{ uri: photoUri }} style={styles.image} /> */}
            <StatusBarAtoms
              backgroundColor={Colors.blueDark}
              barStyle="dark-content"
            />
            <View style={styles.containerHeader}>
              <View style={styles.viewRounded}>
                <Image source={require("../../../assets/user.png")} />
              </View>
              <View style={styles.containerTextoBody}>
                <TextAtom
                  style={styles.textBody}
                  text="Bater ponto de entrada"
                />
              </View>

              <View style={styles.containerTextoBody}>
                <View style={styles.viewRoundedBiometria}>
                  <TouchableOpacity onPress={handleBiometricAuth}>
                    <IconAtom
                      color="white"
                      size={100}
                      name="finger-print"
                      library="Ionicons"
                    />
                  </TouchableOpacity>
                </View>

                <TextAtom
                  style={styles.textBody2}
                  text="Toque no sensor de impressão digital"
                />
              </View>
            </View>
            <View style={styles.contentButton}>
              <ButtonAtom onPress={selectMetodo} style={styles.fullWidthButton}>
                <TextAtom
                  text="Usar outro método"
                  style={styles.fullWidthButtonText}
                ></TextAtom>
              </ButtonAtom>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PointEletronic;

import React, { useCallback, useEffect } from "react";
import { View, Image } from "react-native";
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
  const statusText = useSelector(
    (state: any) => state.timeCircle.statusText
  );


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
        NavigationService.navigate("Home");
      } else {
        dispatch(showErrorToast("Sincronização falhou", syncResult.message));
      }
    } catch (error: any) {
      dispatch(showErrorToast("Falha ao obter os dados", error.message));
    }
  }, [userData, dispatch]);



  const { checkTime, register } = useTimeVerification(
    motoristaData,
    imagem,
    param,
    handleSync,
    dispatch
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {statusText == "EM ANALISE" ? (
          <LatePointEntry photoUri={photoUri} imagem={imagem} param={param} /> // Substitua com o componente que você deseja renderizar
        ) : (
          <>
            <Image source={{ uri: photoUri }} style={styles.image} />
            <View style={styles.contentButton}>
              <LinearGradient
                colors={["#FFA62B", "#272838"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.2, y: 1 }}
                style={styles.fullWidthButton}
              >
                <ButtonAtom onPress={register} style={styles.fullWidthButton}>
                  <TextAtom
                    text="Confirmar"
                    style={styles.fullWidthButtonText}
                  ></TextAtom>
                </ButtonAtom>
              </LinearGradient>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PointEletronic;

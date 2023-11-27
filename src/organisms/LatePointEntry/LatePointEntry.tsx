import React, { useCallback, useState, useEffect } from "react";
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
import { styles } from "./LatePointEntry.styles";
import { useTimeVerification } from "../../hook/useTimeVerification";
import { Formik, Field } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { useTimeVerificationLater } from "../../hook/useTimeVerificationLater";
import { FormikTextInput } from "../../atoms/TextInput/TextInput";
import RegisterLaterAPI from "../../api/camera/registerLater";
import { saveLocation } from "../../secure/secureStoreService";
import useLocation from "../../hook/useLocation";

interface LatePointEntryProps {
  photoUri: string;
  imagem: string;
  param: any;
}

/**
 * Componente LatePointEntry responsável por renderizar a tela de ponto eletrônico.
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.photoUri - URI da foto capturada.
 * @param {string} props.imagem - Imagem a ser enviada.
 * @param {Object} props.param - Parâmetros adicionais.
 */
const LatePointEntry: React.FC<LatePointEntryProps> = ({
  photoUri,
  imagem,
  param,
}) => {
  const motoristaData = useSelector(
    (state: any) => state.motorista.motoristaData
  );
  const [isCodeValid, setIsCodeValid] = useState("");
  const userData = useSelector((state: any) => state.login.userData);
  const dispatch = useDispatch();
  const { location } = useLocation();

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

  const validateCode = async (codigo: string) => {
    const data = {
      PermissaoBatePonto: codigo
    };
    RegisterLaterAPI.getInstance().VerifyCodPermPoint(data).then(
      (sucess: any) => {
        if( 
          sucess.IsValid == true 
        ){
          setIsCodeValid(codigo);
        }else{
          dispatch(showErrorToast("Atenção", sucess.Message));
        }
      }
    ).catch(
      (error) => {
        dispatch(showErrorToast("Atenção", error.message));
      }
    )
  };

  const handleOnPress = (handleSubmit: () => void) => () => {
    handleSubmit();
  };

  const { checkTime, register } = useTimeVerificationLater(
    motoristaData,
    imagem,
    param,
    isCodeValid,
    handleSync,
    dispatch
  );

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ codigo: "" }}
        onSubmit={(values) => validateCode(values.codigo)}
      >
        {({ handleSubmit }) => (
          <>
            {!isCodeValid && (
              <>
                <Field
                  name="codigo"
                  component={FormikTextInput}
                  placeholder="Digite o código"
                  style={styles.inputStyle}
                />
                <LinearGradient
                  colors={["#FFA62B", "#272838"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.2, y: 1 }}
                  style={styles.fullWidthButton}
                >
                  <ButtonAtom onPress={handleOnPress(handleSubmit)}>
                    <TextAtom
                      text="Verificar Código"
                      style={styles.fullWidthButtonText}
                    />
                  </ButtonAtom>
                </LinearGradient>
              </>
            )}
            {isCodeValid && (
              <>
                <Image source={{ uri: photoUri }} style={styles.image} />
                <View style={styles.contentButton}>
                  <LinearGradient
                    colors={["#FFA62B", "#272838"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.2, y: 1 }}
                    style={styles.fullWidthButton}
                  >
                    <ButtonAtom onPress={register}>
                      <TextAtom
                        text="Confirmar"
                        style={styles.fullWidthButtonText}
                      ></TextAtom>
                    </ButtonAtom>
                  </LinearGradient>
                </View>
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default LatePointEntry;

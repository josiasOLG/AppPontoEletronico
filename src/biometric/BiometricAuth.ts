import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export const checkIfLoggedInBefore = async () => {
  const value = await SecureStore.getItemAsync("hasLoggedInBefore");
  return value === "true";
};

export const checkBiometricSupport = async () => {
  const isSupported = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return { isSupported, isEnrolled };
};

export const authenticate = async (): Promise<boolean> => {
  try {
    const { isSupported, isEnrolled } = await checkBiometricSupport();

    if (!isSupported) {
      // Alert.alert("Erro", "Seu dispositivo não suporta autenticação biométrica.");
      return false;
    }

    if (!isEnrolled) {
      // Alert.alert("Erro", "Você não está inscrito para autenticação biométrica.");
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentique-se para continuar",
    });

    if (!result.success) {
      // Alert.alert("Erro", "Falha na autenticação biométrica.");
    }

    return result.success;
  } catch (error) {
    // Alert.alert("Erro", "Ocorreu um erro ao tentar autenticar. Por favor, tente novamente.");
    return false;
  }
};

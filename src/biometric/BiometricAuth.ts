import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const secureOptions = {
  requireAuthentication: false,
  keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
};

export const checkIfLoggedInBefore = async () => {
  const value = await SecureStore.getItemAsync(
    "hasLoggedInBefore",
    secureOptions
  );
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
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (!isSupported) {
      return false;
    }

    if (!isEnrolled) {
      return false;
    }

    let promptMessage = "Autentique-se para continuar";

    if (
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      promptMessage = "Use o Face ID para autenticar";
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
    });
    // console.log(result);
    return result.success;
  } catch (error) {
    return false;
  }
};

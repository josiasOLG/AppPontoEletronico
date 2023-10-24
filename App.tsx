import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  View,
} from "react-native";
import Routes from "./src/routes/Routes";
import store from "./src/redux/store/storeConfig";
import SplashScreen from "./src/atoms/SplashScreen/SplashScreen";
import {
  checkIfLoggedInBefore,
  authenticate,
} from "./src/biometric/BiometricAuth";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import "./src/api";
import { initDatabases } from "./src/database";
import CustomToast from "./src/atoms/CustomToastAtom/CustomToastAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "./src/routes/NavigationService";
import { syncData } from "./src/database/sync/SyncService";
import { logError } from "./src/database/tables/LogErro";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText style={[styles.defaultText, style]} {...props} />;
};

export default function App() {
  const [animationDone, setAnimationDone] = useState(false);
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);

  const globalErrorHandler = (error: any, isFatal: any) => {
    console.log("Erro capturado globalmente:", error, isFatal);
    logError(
      isFatal ? "Fatal Error" : "Non-Fatal Error",
      error.message,
      error.stack
    );
  };
  
  ErrorUtils.setGlobalHandler(globalErrorHandler);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    setTimeout(async () => {
      setAnimationDone(true);
    }, 4000);
  }, [hasLoggedInBefore]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInBefore = await checkIfLoggedInBefore();
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const isBiometricEnabled = await AsyncStorage.getItem("biometric");
      setHasLoggedInBefore(loggedInBefore);
      if (isLoggedIn === "true") {
        setAnimationDone(true);
        if (isBiometricEnabled === "true") {
          NavigationService.navigate("Biometric");
        } else {
          NavigationService.navigate("Home");
        }
      }
    };
    const setupDatabase = async () => {
      await initDatabases();
      await syncData();
    };

    setupDatabase();
    checkLoginStatus();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <RNText>Loading...</RNText>
      </View>
    );
  }

  return (
    <Provider store={store}>
      {animationDone ? (
        <>
          <Routes />
        </>
      ) : (
        <SplashScreen onAnimationFinish={() => setAnimationDone(true)} />
      )}
      <CustomToast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Roboto_400Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
});

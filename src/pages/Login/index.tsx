import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import { loginRequest, loginSuccess } from "../../redux/actions/loginActions";
import UserAPI from "../../api/user/userAPI";
import { showErrorToast } from "../../redux/actions/error.actions";
import LoginSectionMolecules from "../../organisms/LoginSectionOrganisms/LoginSectionOrganisms";
import {
  saveLogin,
  savePassword,
  saveProfile,
  saveToken,
  saveTokenExpiration,
} from "../../secure/secureStoreService";
import LoadingLogin from "./LoadingLogin/LoadingLogin";
import Login from "./Login";

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

interface LoginValues {
  username: string;
  password: string;
  enableBiometry: boolean;
}

const LoginIndex: React.FC<Props> = ({ navigation }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginBegin = () => {
    setIsLoggingIn(true);
  };

  const handleLoginEnd = (success: boolean) => {
    setIsLoggingIn(false);
    if (success) {
      navigation.navigate("Main");
    }
  };

  return isLoggingIn ? (
    <LoadingLogin />
  ) : (
    <Login onLoginBegin={handleLoginBegin} onLoginEnd={handleLoginEnd} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginIndex;

import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Formik, FormikProps } from "formik";
import StatusBarAtoms from "../../atoms/StatusBar/StatusBar";
import { loginRequest, loginSuccess } from "../../redux/actions/loginActions";
import UserAPI from "../../api/user/userAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showErrorToast } from "../../redux/actions/error.actions";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import LoginSectionMolecules from "../../organisms/LoginSectionOrganisms/LoginSectionOrganisms";

type RootStackParamList = {
  Home: undefined;
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

const Login: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = (
    username: string,
    password: string,
    enableBiometric: boolean
  ) => {
    dispatch(loginRequest());
    UserAPI.getInstance()
      .login(username, password)
      .then((userData: any) => {
        // Idealmente, você deve ter uma interface ou tipo para 'userData' também.
        dispatch(loginSuccess(userData));
        AsyncStorage.setItem("isLoggedIn", "true");
        navigation.navigate("Home");
        if (enableBiometric) {
          AsyncStorage.setItem("biometric", "true");
        }
      })
      .catch((error: any) => {
        dispatch(showErrorToast("Atenção", error.message));
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBarAtoms backgroundColor="#010818" barStyle="light-content" />
      <Formik<LoginValues>
        initialValues={{ username: "", password: "", enableBiometry: false }}
        onSubmit={(values) =>
          handleLogin(values.username, values.password, values.enableBiometry)
        }
      >
        {(formikProps: FormikProps<LoginValues>) => (
          <LoginSectionMolecules
            handleChange={(field) => (text) => {
              formikProps.setFieldValue(field, text);
            }}
            handleSubmit={formikProps.handleSubmit}
            setFieldValue={formikProps.setFieldValue}
            values={formikProps.values}
          />
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;

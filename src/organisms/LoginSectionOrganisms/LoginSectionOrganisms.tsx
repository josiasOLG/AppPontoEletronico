import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Wave from '../../svg/Wave';
import LoginFormMolecules from '../../molecules/LoginFormMolecules/LoginFormMolecules';

interface LoginSectionProps {
    handleChange: (field: string) => (text: string) => void;
    handleSubmit: () => void;
    setFieldValue: (field: string, value: any) => void;
    values: {
      username: string;
      password: string;
      enableBiometry: boolean;
    };
  }
  
  const LoginSectionMolecules: React.FC<LoginSectionProps> = (props) => {
    return (
    <View style={styles.containerCenter}>
      <Wave/>
      <Image source={require("../../../assets/logo.png")} resizeMode="contain" style={styles.logo} />
      <LoginFormMolecules {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    backgroundColor: "#272838",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
});

export default LoginSectionMolecules;

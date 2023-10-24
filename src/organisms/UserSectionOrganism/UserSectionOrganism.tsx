// UserSectionOrganism.tsx

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ProfileImageMolecules from "../../molecules/ProfileImageMolecules/ProfileImageMolecules";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentDateInPortuguese } from "../../Utils/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../../routes/NavigationService";

const UserSectionOrganism: React.FC<any> = () => {
  const [currentDateString, setCurrentDateString] = useState("");


  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('biometric');
    NavigationService.navigate('Login'); 
  } 


  useEffect(() => {
    setCurrentDateString(getCurrentDateInPortuguese());
  }, []);

  return (
    <View style={styles.userSection}>
      <View style={styles.column1}>
        <TextAtom style={styles.dia} text={`${currentDateString}, bom dia`} />
        <TextAtom style={styles.userName} text="Josias Oliveira" />
      </View>
      <View style={styles.column2}>
        <ButtonAtom onPress={() => logout()}>
          <IconAtom name="log-out-outline" size={24} color="white" library="Ionicons" />
        </ButtonAtom>
      </View>
      <View style={styles.column3}>
        <ProfileImageMolecules imageUrl="https://www.w3schools.com/howto/img_avatar.png" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSection: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "transparent",
    padding: 20,
  },
  column1: {
    flex: 0.6, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  column2: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  column3: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  dia:{
    fontSize: 16,
    color: '#fff',
    fontWeight: '300'
  },
  syncIconContainer: {},
});

export default UserSectionOrganism;
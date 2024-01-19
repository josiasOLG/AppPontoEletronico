// UserSectionOrganism.tsx

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ProfileImageMolecules from "../../molecules/ProfileImageMolecules/ProfileImageMolecules";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentDateInPortuguese } from "../../Utils/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../../routes/NavigationService";
import { useSelector } from "react-redux";
import { getProfile } from "../../secure/secureStoreService";
import SyncMolecules from "../../molecules/SyncMolecules/SyncMolecules";

type UserSectionProps = {
  handleSync: () => Promise<void>;
};

const UserSectionOrganism: React.FC<UserSectionProps> = ({ handleSync }) => {
  const [currentDateString, setCurrentDateString] = useState("");
  const [profile, setProfile] = useState<any>();

  const logout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("biometric");
    NavigationService.navigate("LoginIndex");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // Renomeada para evitar confusão
      getProfile() // Chamando a função importada
        .then((profile) => {
          if (profile !== null) {
            setProfile(profile);
          }
        })
        .catch((error) => {
          // Tratar erros aqui
        });
    };
    fetchProfile(); // Chamada inicial aqui
    setCurrentDateString(getCurrentDateInPortuguese());
  }, []);

  return (
    <View style={styles.userSection}>
      <View style={styles.column1}>
        <View>
          <ProfileImageMolecules imageUrl="https://www.w3schools.com/howto/img_avatar.png" />
          <ButtonAtom style={styles.logout} onPress={() => logout()}>
            <IconAtom
              name="log-out-outline"
              size={24}
              color="white"
              library="Ionicons"
            />
          </ButtonAtom>
        </View>
        <View style={styles.center}>
          <TextAtom
            style={styles.userName}
            text={profile?.firstName + " " + profile?.lastName}
          />
          <TextAtom style={styles.dia} text={`${currentDateString}, bom dia`} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    position: "absolute",
    right: -100,
  },
  column1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  column2: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  column3: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  dia: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "300",
  },
  syncIconContainer: {},
});

export default UserSectionOrganism;

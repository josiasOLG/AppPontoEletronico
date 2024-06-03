import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import HomeAPI from "../../../api/motorista/HomeAPI";
import { getProfile } from "../../../secure/secureStoreService";
import HeaderInfoMolecule from "../../../molecules/HeaderInfoMolecule/HeaderInfoMolecule";
import MapViewOrganism from "../../../organisms/MapViewOrganism/MapViewOrganism";
import PontoInfoOrganism from "../../../organisms/PontoInfoOrganism/PontoInfoOrganism";
import { fetchPlaceDetails } from "../../../Utils/Utils";
import NavigationService from "../../../routes/NavigationService";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/RootStackParamList";
import TextAtom from "../../../atoms/TextAtom/TextAtom";

type ModalLocalRouteProp = RouteProp<RootStackParamList, "ModalLocal">;

interface ModalLocalProps {
  route: ModalLocalRouteProp;
}

const ModalLocal: React.FC<ModalLocalProps> = ({ route }) => {
  const { item, activeTab } = route.params;
  const [isInsidePerimeter, setIsInsidePerimeter] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profile = await getProfile();
        setProfileData(profile);
        const location = await getCurrentLocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Falha ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <TextAtom text="Carregando..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderInfoMolecule
        profileData={profileData}
        onBackPress={() => NavigationService.navigate("Home")}
      />
      <MapViewOrganism
        userLocation={userLocation}
        perimeterId={item?.Perimetro?.Id}
        onPerimeterCheck={setIsInsidePerimeter} // Passa a função de callback para atualizar o estado
      />
      <PontoInfoOrganism
        isInsidePerimeter={isInsidePerimeter}
        item={item}
        activeTab={activeTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.2,
    zIndex: 1,
    marginTop: 40,
  },
});

export default ModalLocal;

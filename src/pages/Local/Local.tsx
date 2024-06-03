// src/pages/Local.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Local: React.FC = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const locationSubscription = useRef(null);

  // Função para atualizar a localização atual do usuário
  const updateUserLocation = (location) => {
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  // Função para obter permissão e localização atual do usuário
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Não foi possível obter a localização");
      return;
    }

    locationSubscription.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 10 },
      (location) => {
        updateUserLocation(location);
      }
    );
  };

  useEffect(() => {
    getUserLocation();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          region={mapRegion} // Garante que o mapa sempre centralize na região atual
        >
          <Marker
            coordinate={mapRegion}
            pinColor="blue" // A cor azul indica a localização atual do usuário
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Local;

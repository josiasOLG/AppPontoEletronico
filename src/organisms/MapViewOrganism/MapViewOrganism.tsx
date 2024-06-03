import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import HomeAPI from "../../api/motorista/HomeAPI";
import { fetchPlaceDetails } from "../../Utils/Utils";

interface MapViewOrganismProps {
  userLocation: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null;
  perimeterId?: string;
  onPerimeterCheck?: (isInside: boolean) => void;
}

const MapViewOrganism: React.FC<MapViewOrganismProps> = ({
  userLocation,
  perimeterId,
  onPerimeterCheck,
}) => {
  const [perimeterCoordinates, setPerimeterCoordinates] = useState([]);
  const [isInsidePerimeter, setIsInsidePerimeter] = useState(false);
  const [hasCheckedPerimeter, setHasCheckedPerimeter] = useState(false);

  useEffect(() => {
    const fetchAndCheckPerimeter = async () => {
      if (perimeterId && userLocation && !hasCheckedPerimeter) {
        const coordinates = await fetchPlaceDetails(HomeAPI, perimeterId);
        setPerimeterCoordinates(coordinates);
        const inside = await HomeAPI.getInstance().checkIfInsidePerimeter(
          userLocation.latitude,
          userLocation.longitude,
          perimeterId
        );
        setIsInsidePerimeter(inside);
        if (onPerimeterCheck) {
          onPerimeterCheck(inside);
        }
        setHasCheckedPerimeter(true); // Evita novas execuções
      }
    };

    fetchAndCheckPerimeter();
  }, [userLocation, perimeterId, onPerimeterCheck, hasCheckedPerimeter]);

  const polygonKey = perimeterCoordinates
    .map((coord) => `${coord.latitude},${coord.longitude}`)
    .join("-");

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={userLocation}>
        {userLocation && (
          <Marker
            key={isInsidePerimeter ? "blue" : "red"}
            coordinate={userLocation}
            pinColor={isInsidePerimeter ? "blue" : "red"}
          />
        )}
        {perimeterCoordinates.length > 0 && (
          <Polygon
            key={polygonKey} // Usa a chave única gerada
            coordinates={perimeterCoordinates}
            strokeColor="#FF0000"
            fillColor="rgba(255, 0, 0, 0.1)"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: { width: "100%", height: "100%" },
});

export default MapViewOrganism;

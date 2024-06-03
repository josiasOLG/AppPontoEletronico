// useLocationTracker.js
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

const useLocationTracker = (onUpdate) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const subscription = useRef(null);

  useEffect(() => {
    const startWatching = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== "granted") {
          alert("Permissão para acessar a localização foi negada");
          return;
        }
        subscription.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 50, // Recebe atualizações a cada 50 metros.
            timeInterval: 10000, // Recebe atualizações a cada 10 segundos.
          },
          onUpdate // Chama o callback com a localização atualizada.
        );
      } catch (e) {
        console.error(e);
      }
    };

    startWatching();

    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
    };
  }, [onUpdate]);

  return permissionStatus;
};

export default useLocationTracker;

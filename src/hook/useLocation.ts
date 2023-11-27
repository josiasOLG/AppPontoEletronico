import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      setAddress(reverseGeocode[0]); // assuming first result is the most relevant
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getLocationPermission();
      await getCurrentLocation();
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      getAddress(latitude, longitude);
    }
  }, [location]);

  return { location, address, errorMsg };
};

export default useLocation;

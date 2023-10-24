import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Details: undefined;
  Biometric: undefined;
};

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export default {
  navigate,
};

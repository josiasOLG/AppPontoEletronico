import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { RootStackParamList } from './RootStackParamList';

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export default {
  navigate,
};

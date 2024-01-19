import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginIndex from "../pages/Login";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import { navigationRef } from "./NavigationService";
import Biometric from "../pages/Biometric/Biometric";
import CameraPoint from "../pages/Camera/CameraPoint";
import BottomTabNavigator from "../pages/Tab/BottomTabNavigator";

const Stack = createStackNavigator();

type StackScreenOptions = {
  showHeader?: boolean;
  enableBackButton?: boolean;
  tabBarVisible?: boolean;
  title?: string;
  theme?: "dark" | "light";
  textColor?: string;
};

const getScreenOptions = ({
  showHeader = true,
  enableBackButton = true,
  tabBarVisible = true,
  title,
  theme = "light",
  textColor = "",
}: StackScreenOptions) => ({
  headerShown: showHeader,
  headerTransparent: showHeader,
  tabBarVisible,
  title,
  headerStyle: {
    backgroundColor: theme === "dark" ? "#000" : "#fff",
  },
  headerTintColor: textColor || (theme === "dark" ? "#fff" : "#000"),
});

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginIndex"
          component={LoginIndex}
          options={getScreenOptions({ showHeader: false })}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={getScreenOptions({ showHeader: false })} //Depois de logado
        />
        <Stack.Screen
          name="Biometric"
          component={Biometric}
          options={getScreenOptions({ showHeader: false })} //Depois de logado
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={getScreenOptions({ theme: "dark" })} //Depois de logado
        />
        <Stack.Screen
          name="CameraPoint"
          component={CameraPoint}
          options={getScreenOptions({ theme: "dark" })} //Depois de logado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

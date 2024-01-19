// src/navigation/BottomTabNavigator.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import Home from "../Home/Home";
// Importe suas outras telas aqui

const Tab = createBottomTabNavigator();

const ICONS_MAP = {
  Home: { focused: "home", unfocused: "home-outline" },
  Settings: { focused: "settings", unfocused: "settings-outline" },
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: ({ accessibilityState, children, onPress }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.tabBarButton,
              accessibilityState.selected && styles.tabBarButtonFocused,
            ]}
          >
            {children}
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused
            ? ICONS_MAP[route.name].focused
            : ICONS_MAP[route.name].unfocused;
          return (
            <IconAtom
              name={iconName}
              size={focused ? size * 1.5 : size}
              color={"white"}
              library="Ionicons"
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? "white" : "black" }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    height: 80,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  tabBarButtonFocused: {
    backgroundColor: "blue",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
  },
});

export default BottomTabNavigator;

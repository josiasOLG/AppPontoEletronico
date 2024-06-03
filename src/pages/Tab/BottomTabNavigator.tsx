import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import Home from "../Home/Home";
import Noticias from "../Noticias/Noticias";
import Local from "../Local/Local";
import Ponto from "../Ponto/Ponto";
import Config from "../Config/Config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();

const ICONS_MAP = {
  Home: { focused: "home", unfocused: "home-outline" },
  Local: { focused: "settings", unfocused: "settings-outline" },
  Ponto: { focused: "settings", unfocused: "settings-outline" },
  Config: { focused: "settings", unfocused: "settings-outline" },
  Noticias: { focused: "settings", unfocused: "settings-outline" },
};

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={styles.statusBarBackground}>
        <StatusBar style="light" />
      </View>
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
            <Text style={{ color: focused ? "white" : "white" }}>
              {route.name}
            </Text>
          ),
          tabBarStyle: {
            ...styles.tabBar,
            height: insets.bottom + 60,
          },
        })}
      >
        <Tab.Screen name="Local" component={Local} />
        <Tab.Screen name="Noticias" component={Noticias} />
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Ponto" component={Ponto} /> */}
        <Tab.Screen name="Config" component={Config} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Constants.statusBarHeight,
    backgroundColor: "#34AADC",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    backgroundColor: "#0275E4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#34AADC",
  },
  tabBarButtonFocused: {
    backgroundColor: "#0275E4",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
  },
});

export default BottomTabNavigator;

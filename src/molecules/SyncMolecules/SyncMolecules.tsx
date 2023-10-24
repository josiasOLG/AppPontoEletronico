import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";

type UserSectionProps = {
  handleSync: () => Promise<void>;
};

const SyncMolecules: React.FC<UserSectionProps> = ({ handleSync }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const startSyncAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopSyncAnimation = () => {
    Animated.timing(spinValue).stop();
  };

  const handleButtonPress = async () => {
    startSyncAnimation();
    try {
      await handleSync();
      stopSyncAnimation();
    } catch {
      stopSyncAnimation();
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <ButtonAtom onPress={handleButtonPress} style={styles.syncIconContainer}>
        <View style={styles.containerBackground}>
          <View style={styles.iconColumn}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconAtom name="sync" size={30} color="red" library="Ionicons" />
            </Animated.View>
          </View>
          <View style={styles.textColumn}>
            <TextAtom style={styles.upperText} text="Sincronizar" />
            <TextAtom
              style={styles.lowerText}
              text="sincronize a base de dados"
            />
          </View>
        </View>
      </ButtonAtom>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerBackground: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  iconColumn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textColumn: {
    flex: 0.8,
  },
  upperText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  lowerText: {
    color: "#333",
    fontSize: 16,
  },
  syncIconContainer: {},
});

export default SyncMolecules;

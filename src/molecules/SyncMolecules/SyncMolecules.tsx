import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import { remFontSize } from "../../Utils/Utils";
import { RFPercentage } from "react-native-responsive-fontsize";

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
              <IconAtom
                name="sync"
                size={30}
                color="white"
                library="Ionicons"
              />
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
    position: "absolute",
    width: "80%",
    top: -10,
  },
  containerBackground: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5856D6",
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
    color: "#fff",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  lowerText: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },
  syncIconContainer: {},
});

export default SyncMolecules;

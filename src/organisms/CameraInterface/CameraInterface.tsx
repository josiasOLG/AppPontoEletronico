import React from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Image, StyleSheet } from "react-native";
import { LoadingIndicator } from "../../atoms/LoadingIndicator/LoadingIndicator";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";

interface CameraInterfaceProps {
  type: CameraType; // Utilizando CameraType diretamente
  isLoading: boolean;
  onTakePicture: () => void;
  cameraRef: React.RefObject<Camera>;
}

export const CameraInterface: React.FC<CameraInterfaceProps> = ({
  type,
  isLoading,
  onTakePicture,
  cameraRef,
}) => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        {isLoading && <LoadingIndicator />}
      </Camera>
      <View style={styles.contentBtn}>
        <ButtonAtom onPress={onTakePicture}>
          <Image source={require("../../../assets/btn-foto.png")} />
        </ButtonAtom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  camera: {
    flex: 1,
  },
});

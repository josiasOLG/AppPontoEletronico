import React from "react";
import { View, Image, StyleSheet } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import TextAtom from "../../atoms/TextAtom/TextAtom";
import IconAtom from "../../atoms/IconAtom/IconAtom";
import { Colors } from "../../styles";

interface CameraPreviewProps {
  photoUri: string;
  onRetake: () => void;
  onConfirm: () => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  photoUri,
  onRetake,
  onConfirm,
}) => (
  <View style={styles.container}>
    <Image source={{ uri: photoUri }} style={styles.camera} />
    <View style={styles.contentBtn}>
      {/* <View style={[styles.collum6, styles.center]}>
        <ButtonAtom onPress={onRetake}>
          <IconAtom color={Colors.orange} name="camera-reverse" size={80} library="Ionicons"/>
        </ButtonAtom>
      </View> */}
      <View style={[styles.collum6, styles.right]}>
        <ButtonAtom onPress={onConfirm} style={styles.confBtn}>
          <IconAtom
            color={Colors.orange}
            name="checkmark"
            size={50}
            library="Ionicons"
          />
        </ButtonAtom>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    flex: 1,
  },
  contentBtn: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  collum6: {
    flex: 6,
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  confBtn: {
    borderWidth: 3,
    borderRadius: 50,
    padding: 10,
    borderColor: Colors.orange,
  },
});

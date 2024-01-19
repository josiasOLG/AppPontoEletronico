import React from "react";
import { Image, StyleSheet, View } from "react-native";
import IconAtom from "../../atoms/IconAtom/IconAtom";

type ProfileImageProps = {
  imageUrl: string;
  width?: number; // Adicionado
  height?: number; // Adicionado
};

const ProfileImageMolecules: React.FC<ProfileImageProps> = ({
  imageUrl,
  width = 80,
  height = 80,
}) => {
  // Valores padrão definidos como 80
  return (
    <View style={[styles.profileImageContainer, { width, height }]}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <IconAtom
        name="camera"
        color="white"
        size={16}
        style={styles.cameraIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 0,
  },
});

export default ProfileImageMolecules;

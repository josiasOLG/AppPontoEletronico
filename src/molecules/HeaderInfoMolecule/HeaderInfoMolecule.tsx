import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import ButtonAtom from "../../atoms/ButtonAtom/ButtonAtom";
import VoltarSvg from "../../atoms/SVG/VoltarSvg";

interface HeaderInfoProps {
  profileData: any;
  onBackPress: () => void;
}

const HeaderInfoMolecule: React.FC<HeaderInfoProps> = ({
  profileData,
  onBackPress,
}) => {
  return (
    <View style={styles.infoContainer}>
      <ButtonAtom onPress={onBackPress}>
        <VoltarSvg />
      </ButtonAtom>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{profileData?.firstName}</Text>
        <Text style={styles.description}>{profileData?.lastName}</Text>
      </View>
      <Image
        style={styles.roundImage}
        source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  roundImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default HeaderInfoMolecule;

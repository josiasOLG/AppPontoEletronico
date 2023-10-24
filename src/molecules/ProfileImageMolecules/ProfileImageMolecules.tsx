import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import IconAtom from '../../atoms/IconAtom/IconAtom';

type ProfileImageProps = {
  imageUrl: string;
  width?: number; // Adicionado
  height?: number; // Adicionado
};

const ProfileImageMolecules: React.FC<ProfileImageProps> = ({ imageUrl, width = 80, height = 80 }) => { // Valores padrão definidos como 80
  return (
    <View style={[styles.profileImageContainer, { width, height }]}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <IconAtom name='camera' color='white' size={16} style={styles.cameraIcon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cameraIcon: {
    position: 'absolute',
    top: 20,
    right: -10,
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 0,
  },
});

export default ProfileImageMolecules;

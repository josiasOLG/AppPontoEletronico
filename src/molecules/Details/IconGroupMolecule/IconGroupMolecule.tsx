import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import IconAtom from '../../../atoms/IconAtom/IconAtom';

interface Icon {
  name: string;
  color: string;
}

interface IconGroupMoleculeProps {
  icons: Icon[];
}

const styles = StyleSheet.create({
  iconGroup: {
    flexDirection: "row",
    justifyContent: "center",
  } as ViewStyle,
  icon: {
    marginHorizontal: 5,
  } as ViewStyle,
});

const IconGroupMolecule: React.FC<IconGroupMoleculeProps> = ({ icons }) => {
  return (
    <View style={styles.iconGroup}>
      {icons.map((icon, index) => (
        <IconAtom key={index} name={icon.name} size={24} color={icon.color} style={styles.icon} />
      ))}
    </View>
  );
};

export default IconGroupMolecule;

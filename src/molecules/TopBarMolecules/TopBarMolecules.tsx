// TopBarMolecules.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assumindo que você esteja usando o Ionicons, mas você pode usar qualquer ícone da sua escolha.
import TextAtom from '../../atoms/TextAtom/TextAtom';


const TopBarMolecules: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}></View>
      <View style={styles.middleColumn}>
        <TextAtom text='JOB'/>
      </View>
      <View style={styles.rightColumn}>
        <Ionicons name="md-information-circle-outline" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50, // ou qualquer altura que desejar para sua barra superior.
    backgroundColor: '#f2f2f2', // Cor de fundo como exemplo.
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default TopBarMolecules;

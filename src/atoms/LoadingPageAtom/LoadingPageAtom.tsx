import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingPageAtom = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});

export default LoadingPageAtom;

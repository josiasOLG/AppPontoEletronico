import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarAtoms from '../../atoms/StatusBar/StatusBar';
import DetailsOrganism from '../../organisms/Details/DetailsOrganism/DetailsOrganism';

interface LinearGradientProps {
  colors: string[];
  start: { x: number, y: number };
  end: { x: number, y: number };
  style: ViewStyle;
}

interface StatusBarProps {
  backgroundColor: string;
  barStyle: 'default' | 'light-content' | 'dark-content';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010818",
    paddingTop: 50,
  } as ViewStyle,
  gradientEffect: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0, 
  } as ViewStyle,
});

const Details: React.FC = () => {
  const linearGradientProps: LinearGradientProps = {
    colors: ['#006400', '#20B2AA'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    style: styles.gradientEffect
  };

  const statusBarProps: StatusBarProps = {
    backgroundColor: "transparent",
    barStyle: "dark-content"
  };

  return (
    <View style={styles.container}>
      <StatusBarAtoms {...statusBarProps} />
      <LinearGradient {...linearGradientProps} />
      <DetailsOrganism />
    </View>
  );
};

export default Details;

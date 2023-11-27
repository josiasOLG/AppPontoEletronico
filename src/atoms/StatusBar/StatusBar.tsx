// StatusBarAtoms.tsx
import React, { useEffect } from 'react';
import { StatusBar, StatusBarStyle, View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StatusBarAtomsProps {
  backgroundColor?: string;
  barStyle: StatusBarStyle;
  updateStatusBarColor?: (color: string) => void;
  gradientColors?: string[];
}

const StatusBarAtoms: React.FC<StatusBarAtomsProps> = ({
  backgroundColor,
  barStyle,
  updateStatusBarColor,
  gradientColors = ['#32a852', '#197836'],
}) => {
  useEffect(() => {
    if (updateStatusBarColor) {
      updateStatusBarColor(backgroundColor || gradientColors[0]);
    }
  }, [backgroundColor, updateStatusBarColor]);

  const renderStatusBarBackground = () => {
    // console.log(Platform.OS);
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
          <StatusBar barStyle={barStyle} />
        </View>
      );
    }  

    if (backgroundColor) {
      return (
        <View style={[styles.container, { backgroundColor }]}>
          <StatusBar
            backgroundColor='transparent'
            barStyle={barStyle}
            translucent={true}
          />
        </View>
      );
    }

    return (
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <StatusBar
          backgroundColor='transparent'
          barStyle={barStyle}
          translucent={true}
        />
      </LinearGradient>
    );
  };

  return <View style={styles.container}>{renderStatusBarBackground()}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: StatusBar.currentHeight,
  },
  gradient: {
    flex: 1,
  }
});

export default StatusBarAtoms;

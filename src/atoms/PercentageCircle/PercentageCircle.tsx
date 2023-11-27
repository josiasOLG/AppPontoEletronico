import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface PercentageCircleProps {
  percentage: number;
  size: number;
  dataArray?: any[]; 
  onDataArrayChange?: (dataArray: any[]) => void;
}

const PercentageCircle: React.FC<PercentageCircleProps> = ({ percentage, size }) => {
  const radius = size / 2;
  const strokeWidth = 8;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset = circleCircumference * (1 - percentage / 100);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          <Circle
            stroke="#EDF2F4"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Circle
            stroke="#FFA62B"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circleCircumference} ${circleCircumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
        <Circle
          fill="#FFA62B"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth - 15}
        />
      </Svg>
      <Text style={styles.timerText}>{`${percentage}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'relative',
  },
  timerText: {
    position: 'absolute',
    fontSize: 20,
    zIndex: 1,
    color: '#333',
    textAlign: 'center',
    fontWeight: '700'
  },
});

export default PercentageCircle;

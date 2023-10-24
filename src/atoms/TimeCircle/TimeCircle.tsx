import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface TimeCircleProps {
  minutes: number;
  size: number;
}

const TimeCircle: React.FC<TimeCircleProps> = ({ minutes, size }) => {
  const [TOTAL_TIME, setTotalTime] = useState(minutes * 60); // minutos em segundos
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setTotalTime(minutes * 60);
    setElapsedTime(0);

    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => {
        if (prevTime >= TOTAL_TIME - 1) {
          clearInterval(intervalId);
          return TOTAL_TIME;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [minutes]);

  const getProgressColor = () => {
    return '#ff3131';
  };

  const radius = size / 2; // Agora o raio é baseado no tamanho fornecido
  const strokeWidth = 8;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset = circleCircumference * (1 - elapsedTime / TOTAL_TIME);

  const remainingMinutes = Math.floor((TOTAL_TIME - elapsedTime) / 60);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          <Circle
            stroke="#1f2535"
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth}
            strokeWidth={strokeWidth}
            strokeLinecap="round" 
          />
          <Circle
            stroke={getProgressColor()}
            fill="none"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth }
            strokeWidth={strokeWidth}
            strokeLinecap="round" 
            strokeDasharray={`${circleCircumference} ${circleCircumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
        <Circle
          fill="#ff3131"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth - 15}
        />
      </Svg>
      <Text style={styles.timerText}>{`${remainingMinutes} ${'\n'} min`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  timerText: {
    position: 'absolute',
    fontSize: 20,
    zIndex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});

export default TimeCircle;

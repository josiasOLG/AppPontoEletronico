import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { useDispatch } from "react-redux";
import { setButtonStatus, setStatusText } from "../../redux/actions/timeCircle.actions";

interface TimeCircleProps {
  minutes: number;
  size: number;

}

const TimeCircle: React.FC<TimeCircleProps> = ({ minutes, size }) => {
  const [TOTAL_TIME, setTotalTime] = useState(minutes * 60); // minutos em segundos
  const [elapsedTime, setElapsedTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const newTotalTime = minutes * 60;
    setTotalTime(newTotalTime);
    setElapsedTime(0);

    if (newTotalTime > 0) {
      const intervalId = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime >= newTotalTime - 1) {
            clearInterval(intervalId);
            return newTotalTime;
          }
          return prevTime + 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [minutes]);


  const getProgressColor = () => {
    return "#AF1B3F";
  };

  const radius = size / 2; // Agora o raio é baseado no tamanho fornecido
  const strokeWidth = 8;
  const circleCircumference = 2 * Math.PI * radius;
  const safeTotalTime = TOTAL_TIME || 0;
  const strokeDashoffset = circleCircumference * (1 - elapsedTime / safeTotalTime);

  const formatRemainingTime = (remainingTime: number) => {
    if (remainingTime >= 0 && remainingTime <= -10) {
      remainingTime = Math.abs(remainingTime);
    }

    if (remainingTime < 60) {
      return `${remainingTime} min`;
    }
    const hours = Math.floor(remainingTime / 60);
    const minutes = remainingTime % 60;
    return `${hours}h\n${minutes} min`;
  };

  const remainingMinutes = Math.floor((TOTAL_TIME - elapsedTime) / 60);
  const formattedTime = formatRemainingTime(remainingMinutes);

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
            stroke={getProgressColor()}
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
          fill="#AF1B3F"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth - 15}
        />
      </Svg>
      <Text style={styles.timerText}>
        {formattedTime <= '0' ? '0 min' : formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
  },
  timerText: {
    position: "absolute",
    fontSize: 20,
    zIndex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});

export default TimeCircle;

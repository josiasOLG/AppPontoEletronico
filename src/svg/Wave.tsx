import React, { useEffect, useRef } from "react";
import { Dimensions, Animated } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Wave = () => {
  const windowWidth = Dimensions.get("window").width;
  const animationValue = useRef(new Animated.Value(0)).current;
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 5000, // Duração da animação
          useNativeDriver: false,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 5000, // Duração da animação
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const d = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      `M0 40 Q ${windowWidth / 4} 10 ${windowWidth / 2} 40 T ${windowWidth} 40 V 150 H 0 Z`,
      `M0 40 Q ${windowWidth / 4} 60 ${windowWidth / 2} 40 T ${windowWidth} 40 V 150 H 0 Z`,
    ],
  });

  return (
    <Svg
      width={windowWidth}
      height="150"
      viewBox={`0 0 ${windowWidth} 150`}
      style={{ position: "absolute", bottom: 0 }}
    >
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" >
          <Stop offset="0%" stopColor="#4cbd4c" stopOpacity="1" />
          <Stop offset="100%" stopColor="#20B2AA" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <AnimatedPath d={d} fill="url(#gradient)" />
    </Svg>
  );
};

export default Wave;

import { useRef } from "react";
import { Animated } from "react-native";

const useScale = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Scale up to 1.05x
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Scale back to 1x
      useNativeDriver: true,
    }).start();
  };

  return { scaleValue, handlePressIn, handlePressOut };
}

export default useScale;
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const useTripScrolling = () => {
    const [showSmallTabs, setShowSmallTabs] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 0],
    extrapolate: "clamp",
  });
  const smallTabOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const mainTabOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    const scrollListener = scrollY.addListener((value) => {
      const currentOpacity = smallTabOpacity.__getValue();
      if (currentOpacity > 0) {
        setShowSmallTabs(true);
      } else {
        setShowSmallTabs(false);
      }
    });

    return () => {
      scrollY.removeListener(scrollListener);
    };
  }, [scrollY]);


  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return { showSmallTabs, handleScroll, imageHeight, smallTabOpacity, mainTabOpacity };

}

export default useTripScrolling;
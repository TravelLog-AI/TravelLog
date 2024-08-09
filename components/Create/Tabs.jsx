import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import PrimaryButton from "../Primary/Button";
import { Colors } from "../../constants/Colors";
import { createStyles } from "./styles";

export const TABS = {
  TRIP: "trip",
  BLOG: "blog",
};

export default function CreateTabs({ currentTab, setCurrentTab }) {
  // Animated Values
  const tripBackground = useRef(
    new Animated.Value(currentTab === TABS.TRIP ? 1 : 0)
  ).current;
  const blogBackground = useRef(
    new Animated.Value(currentTab === TABS.BLOG ? 1 : 0)
  ).current;

  useEffect(() => {
    if (currentTab === TABS.TRIP) {
      Animated.timing(tripBackground, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.linear),
        useNativeDriver: false,
      }).start();
      Animated.timing(blogBackground, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(tripBackground, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear),
        useNativeDriver: false,
      }).start();
      Animated.timing(blogBackground, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.linear),
        useNativeDriver: false,
      }).start();
    }
  }, [currentTab]);

  // Transition between colors
  const tripBackgroundColor = tripBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.PRIMARY, Colors.PRIMARY_BACKGROUND],
  });

  const blogBackgroundColor = blogBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.PRIMARY, Colors.PRIMARY_BACKGROUND],
  });

  return (
    <View style={createStyles.tabContainer}>
      <Animated.View
        style={{
          backgroundColor: tripBackgroundColor,
          borderRadius: 10,
          width: "45%",
        }}
      >
        <PrimaryButton
          labelStyle={{
            color: currentTab === TABS.TRIP ? Colors.PRIMARY : Colors.WHITE,
          }}
          style={{
            backgroundColor: "transparent",
            padding: 10,
          }}
          onPress={() => setCurrentTab(TABS.TRIP)}
        >
          Trip
        </PrimaryButton>
      </Animated.View>
      <Animated.View
        style={[
          { width: "45%" },
          { backgroundColor: blogBackgroundColor, borderRadius: 10 },
        ]}
      >
        <PrimaryButton
          labelStyle={{
            color: currentTab === TABS.BLOG ? Colors.PRIMARY : Colors.WHITE,
          }}
          style={{
            backgroundColor: "transparent",
            padding: 10,
          }}
          onPress={() => setCurrentTab(TABS.BLOG)}
        >
          Blog
        </PrimaryButton>
      </Animated.View>
    </View>
  );
}

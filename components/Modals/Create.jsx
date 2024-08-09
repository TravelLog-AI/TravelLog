

import { View, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import PrimaryButton from "../Primary/Button";

const TABS = {
  TRIP: "trip",
  BLOG: "blog",
};

export default function CreateModal({ open, onClose }) {
  const [currentTab, setCurrentTab] = useState(TABS.TRIP);

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
    <View>
      <Modal isVisible={open} style={createStyles.container}>
        <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Entypo
            name="cross"
            size={40}
            color={Colors.GREY}
            onPress={onClose}
          />
        </View>

        {/* Tabs */}
        <View style={createStyles.tabContainer}>
          <Animated.View
            style={[
              { width: "45%" },
              { backgroundColor: tripBackgroundColor, borderRadius: 10 },
            ]}
          >
            <PrimaryButton
              labelStyle={{
                color: currentTab === TABS.TRIP ? Colors.PRIMARY : Colors.WHITE,
              }}
              style={{
                backgroundColor: "transparent",
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
              }}
              onPress={() => setCurrentTab(TABS.BLOG)}
            >
              Blog
            </PrimaryButton>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

export const createStyles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-start",
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    padding: 5,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
  },
});
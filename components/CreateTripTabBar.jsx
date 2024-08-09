import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

export default function CreateTripTabBar({ state, descriptors, navigation }) {
  console.log(state.routes);
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName =
          route.name === "home"
            ? "home"
            : route.name === "search"
            ? "search"
            : route.name === "discover"
            ? "globe"
            : "user";
        const IconComponent = Feather;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Adding an empty view before the center button
        if (index === Math.floor(state.routes.length / 2)) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.button}
              onPress={() => alert("Button Pressed!")}
            >
              <Ionicons name="add-circle" size={50} color={Colors.PRIMARY} />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <IconComponent
              name={iconName}
              size={30}
              color={isFocused ? Colors.PRIMARY : "grey"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "white",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  midSpace: {
    width: 48, // Adjust the width to match the size of your button
  },
  button: {
    // position: "relative",
    // bottom: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 80
  },
});

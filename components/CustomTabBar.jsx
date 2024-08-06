import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../constants/Colors";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName =
          route.name === "mytrip"
            ? "bus-sharp"
            : route.name === "search"
            ? "search"
            : route.name === "discover"
            ? "globe-sharp"
            : "user-circle-o";
        const IconComponent = route.name === "profile" ? FontAwesome : Ionicons;
        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

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
              size={24}
              color={isFocused ? Colors.PRIMARY : "grey"}
            />
          </TouchableOpacity>
        )
      })}
       <TouchableOpacity style={styles.button} onPress={() => alert("Button Pressed!")}>
        <Ionicons name="add-circle" size={48} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
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
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

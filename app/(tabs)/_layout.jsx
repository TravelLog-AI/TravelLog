import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "./../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.LIGHT_PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "home",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? Colors.PRIMARY : "grey"}
            />
          ),
          tabBarInactiveTintColor: "grey",
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={30}
              color={focused ? Colors.PRIMARY : "grey"}
            />
          ),
          tabBarInactiveTintColor: "grey",
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="globe"
              size={30}
              color={focused ? Colors.PRIMARY : "grey"}
            />
          ),
          tabBarInactiveTintColor: "grey",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={30}
              color={focused ? Colors.PRIMARY : "grey"}
            />
          ),
          tabBarInactiveTintColor: "grey",
        }}
      />
    </Tabs>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomTabBar from "../../components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.LIGHT_PRIMARY,
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({focused}) => (
            <Ionicons name="bus-sharp" size={24} color={focused ? Colors.PRIMARY : "grey"} />
          ),
          tabBarInactiveTintColor: "grey"
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({focused}) => (
            <Ionicons name="search" size={24} color={focused ? Colors.PRIMARY : "grey"} />
          ),
          tabBarInactiveTintColor: "grey"
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({focused}) => (
            <Ionicons name="globe-sharp" size={24} color={focused ? Colors.PRIMARY : "grey"} />
          ),
          tabBarInactiveTintColor: "grey"
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({focused}) => (
            <FontAwesome name="user-circle-o" size={24} color={focused ? Colors.PRIMARY : "grey"} />
          ),
          tabBarInactiveTintColor: "grey"
        }}
      />
    </Tabs>
  );
}

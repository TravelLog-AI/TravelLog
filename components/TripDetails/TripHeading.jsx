import { View, Text, Animated, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import TripTabs from "./TripTabs";
import { tripDetailTabs } from "../../constants/arrays";
import PrimaryButton from "../Primary/Button";
import useTripScrolling from "../../hooks/useTripScrolling";
import { useRouter } from "expo-router";

export default function TripHeading({ tripData, currentTripTab, setCurrentTripTab }) {
  const { showSmallTabs, imageHeight, smallTabOpacity, mainTabOpacity } = useTripScrolling();

  const router = useRouter();

  return (
    <>
      <Animated.Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
            tripData?.photoRef || ""
          }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{ width: "100%", height: imageHeight }}
      />
      <SafeAreaView
        style={{ position: "absolute", zIndex: 101, marginHorizontal: 20 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="home" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Tab Buttons */}

      <Animated.View
        style={{
          opacity: mainTabOpacity,
          display: !showSmallTabs ? "flex" : "none",
        }}
      >
        <TripTabs
          currentTab={currentTripTab}
          setCurrentTab={setCurrentTripTab}
        />
      </Animated.View>

      <Animated.View
        style={{
          zIndex: 100, // Ensure it's above other elements
          backgroundColor: Colors.WHITE,
          width: "100%",
          flexDirection: "column",
          shadowColor: "rgba(100, 100, 111, 1)",
          shadowOffset: { width: 0, height: 7 },
          shadowOpacity: 0.2,
          shadowRadius: 29 / 2,
          opacity: smallTabOpacity,
          display: showSmallTabs ? "flex" : "none",
          paddingTop: 60,
        }}
      >
        <Animated.View
          style={{
            opacity: smallTabOpacity,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            display: showSmallTabs ? "flex" : "none",
          }}
        >
          <Text
            style={{
              fontFamily: "open-sans-bold",
              textAlign: "center",
            }}
          >
            Trip to {tripData?.tripData?.trip?.destination}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            opacity: smallTabOpacity,
            display: showSmallTabs ? "flex" : "none",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              elevation: 7,
            }}
          >
            {tripDetailTabs.map((tripTab, index) => {
              let icon;
              if (currentTripTab === tripTab.name) {
                icon = tripDetailTabs[index].getIcon(Colors.WHITE);
              } else {
                icon = tripDetailTabs[index].getIcon(Colors.PRIMARY);
              }

              return (
                <PrimaryButton
                  key={tripTab.id}
                  style={{
                    width: "25%",
                    borderRadius: 10,
                    backgroundColor:
                      currentTripTab === tripTab.name
                        ? Colors.PRIMARY
                        : Colors.WHITE,
                    shadowColor: "rgba(100, 100, 111, 1)",
                    shadowOffset: { width: 0, height: 7 },
                    shadowOpacity: 0.2,
                    shadowRadius: 29 / 2,
                    // elevation: 7,
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                    padding: 5,
                  }}
                  onPress={() => setCurrentTripTab(tripTab.name)}
                  labelStyle={{
                    fontSize: 10,
                    color:
                      currentTripTab === tripTab.name
                        ? Colors.WHITE
                        : Colors.PRIMARY,
                  }}
                >
                  {tripTab.name}
                </PrimaryButton>
              );
            })}
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
}

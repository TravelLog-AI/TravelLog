import { View, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import TripTabs from "../../components/TripDetails/TripTabs";
import TripOverview from "../../components/TripDetails/TripOverview";
import { tripDetailTabs } from "../../constants/arrays";
import TripItinerary from "../../components/TripDetails/TripItinerary";
import TripAdvisor from "../../components/TripDetails/TripAdvisor";

export default function TripDetails() {
  const [currentSubTab, setCurrentSubTab] = useState("");
  const [currentTripTab, setCurrentTripTab] = useState("Overview");

  return (
    <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1709999370305-cf9b7c368cd2?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ width: "100%", height: "40%" }}
      />

      {/* Tab Buttons */}
      <TripTabs currentTab={currentTripTab} setCurrentTab={setCurrentTripTab} />

      {/* Trip Tab */}
      {currentTripTab === tripDetailTabs[0].name ? (
        <TripOverview />
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary />
      ) : (
        <TripAdvisor />
      )}
    </View>
  );
}

import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import TripTabs from "../../components/TripDetails/TripTabs";
import TripOverview from "../../components/TripDetails/TripOverview";
import { tripDetailTabs } from "../../constants/arrays";
import TripItinerary from "../../components/TripDetails/TripItinerary";
import TripAdvisor from "../../components/TripDetails/TripAdvisor";
import { useLocalSearchParams } from "expo-router";
import { showToast } from './../../utils/toast';
import { doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { fetchDoc } from "../../utils/db";

export default function TripDetails() {
  const [currentSubTab, setCurrentSubTab] = useState("");
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const [tripData, setTripData] = useState();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      fetchTripData();
    }
  }, [id]);

  const fetchTripData = async () => {
    try {
      const tripDoc = await fetchDoc('Trips', id);
      setTripData(tripDoc.docData);
    } catch (error) {
      console.log('Something Went Wrong: ', error);
      showToast('error', 'Something Went Wrong', error);
    }
  }

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
        <TripOverview tripData={tripData?.tripData?.trip || {}}/>
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary itineraryData={tripData?.tripData?.trip.itinerary || []} />
      ) : (
        <TripAdvisor />
      )}
    </View>
  );
}

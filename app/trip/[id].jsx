import { View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import TripTabs from "../../components/TripDetails/TripTabs";
import TripOverview from "../../components/TripDetails/TripOverview";
import { tripDetailTabs } from "../../constants/arrays";
import TripItinerary from "../../components/TripDetails/TripItinerary";
import TripAdvisor from "../../components/TripDetails/TripAdvisor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { showToast } from './../../utils/toast';
import { fetchDoc } from "../../utils/db";
import Feather from "@expo/vector-icons/Feather";

export default function TripDetails() {
  // const [currentSubTab, setCurrentSubTab] = useState("");
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const [tripData, setTripData] = useState();

  const router = useRouter();

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
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
            tripData?.photoRef || ""
          }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{ width: "100%", height: "30%" }}
      />
      <SafeAreaView
        style={{ position: "absolute", top: 0, left: 0, margin: 30 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="home" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Tab Buttons */}
      <TripTabs currentTab={currentTripTab} setCurrentTab={setCurrentTripTab} />

      {/* Trip Tab */}
      {currentTripTab === tripDetailTabs[0].name ? (
        <TripOverview tripData={tripData?.tripData?.trip || {}} />
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary
          itineraryData={tripData?.tripData?.trip.itinerary || []}
        />
      ) : (
        <TripAdvisor />
      )}
    </View>
  );
}

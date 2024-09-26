import {Animated, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import TripOverview from "../../components/TripDetails/TripOverview";
import { tripDetailTabs } from "../../constants/arrays";
import TripItinerary from "../../components/TripDetails/TripItinerary";
import TripAdvisor from "../../components/TripDetails/TripAdvisor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import TripHeading from "../../components/TripDetails/TripHeading";
import useTripScrolling from "../../hooks/useTripScrolling";

const animationTime = 100;
export default function TripDetails() {
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const [tripData, setTripData] = useState();
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const { showSmallTabs, handleScroll, imageHeight, smallTabOpacity, mainTabOpacity } = useTripScrolling();

  // Set up the listener in `useEffect`
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Trips", id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setTripData({...docSnapshot.data(), docId: docSnapshot.id});
      } else {
        console.log("Trip data not found");
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [id]);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
      }}
    >
      <TripHeading
        tripData={tripData}
        currentTripTab={currentTripTab}
        setCurrentTripTab={setCurrentTripTab}
      />

      {/* Trip Tab */}
      {currentTripTab === tripDetailTabs[0].name ? (
        <Animated.ScrollView
          style={{ backgroundColor: Colors.WHITE }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <TripOverview
            tripData={tripData?.tripData?.trip || {}}
            coordinates={tripData?.coordinates}
            tripId={id}
            isOwner
          />
        </Animated.ScrollView>
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary
          itineraryData={tripData?.tripData?.trip.itinerary || []}
          tripLandmarks={tripData?.tripData?.trip?.landmarks || []}
          tripId={tripData?.docId || 0}
          isOwner
        />
      ) : (
        <Animated.ScrollView
          style={{ backgroundColor: Colors.WHITE }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <TripAdvisor />
        </Animated.ScrollView>
      )}
    </View>
  );
}

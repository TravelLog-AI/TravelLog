import {Animated, Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import TripTabs from "../../components/TripDetails/TripTabs";
import TripOverview from "../../components/TripDetails/TripOverview";
import { tripDetailTabs } from "../../constants/arrays";
import TripItinerary from "../../components/TripDetails/TripItinerary";
import TripAdvisor from "../../components/TripDetails/TripAdvisor";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import PrimaryButton from "../../components/Primary/Button";

const animationTime = 100;
export default function TripDetails() {
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const [tripData, setTripData] = useState();
    // Track scroll position
  const [showSmallTabs, setShowSmallTabs] = useState(false);
  const router = useRouter();

  const { id } = useLocalSearchParams();
  
  // Animated
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 0],
    extrapolate: 'clamp'
  });
  const smallTabOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  const mainTabOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    const scrollListener = scrollY.addListener((value) => {
      const currentOpacity = smallTabOpacity.__getValue();
      if (currentOpacity > 0) {
        setShowSmallTabs(true);
      } else {
        setShowSmallTabs(false)
      }
    });

    return () => {
      scrollY.removeListener(scrollListener);
    }
  }, [scrollY]);

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

    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    );

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
      }}
    >
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
        {/* <View style={{ flexDirection: "row" }}> */}
        {/* <View style={{ marginVertical: 10, marginLeft: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="home" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View> */}
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
        {/* </View> */}
      </Animated.View>

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
            />
          </Animated.ScrollView>
        ) : currentTripTab === tripDetailTabs[1].name ? (
          <TripItinerary
            itineraryData={tripData?.tripData?.trip.itinerary || []}
            tripLandmarks={tripData?.tripData?.trip?.landmarks || []}
            tripId={tripData?.docId || 0}
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

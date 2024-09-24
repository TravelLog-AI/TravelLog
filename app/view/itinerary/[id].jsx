import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TripHeading from '../../../components/TripDetails/TripHeading';
import { useLocalSearchParams } from 'expo-router';
import { showToast } from '../../../utils/toast';
import { fetchDoc } from '../../../utils/db';
import { Colors } from '../../../constants/Colors';
import TripOverview from '../../../components/TripDetails/TripOverview';
import { tripDetailTabs } from '../../../constants/arrays';
import TripItinerary from '../../../components/TripDetails/TripItinerary';
import TripAdvisor from '../../../components/TripDetails/TripAdvisor';

export default function ItineraryView() {
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const [tripData, setTripData] = useState();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchTripData();
  }, []);

  const fetchTripData = async () => {
    try {
      const response = await fetchDoc('Trips', id);
      console.log(response,'response');

      setTripData(response.docData);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error','There was an error in fetching data: ', error);
    }
   
  }
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

      {/* <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
        Landmarks
      </Text> */}
      {currentTripTab === tripDetailTabs[0].name ? (
        <ScrollView>
          <TripOverview
            tripData={tripData?.tripData?.trip}
            coordinates={tripData?.coordinates}
            tripId={id}
          />
        </ScrollView>
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary
          itineraryData={tripData?.tripData?.trip.itinerary || []}
          tripLandmarks={tripData?.tripData?.trip?.landmarks || []}
          tripId={id}
        />
      ) : (
        <TripAdvisor />
      )}
    </View>
  );
}
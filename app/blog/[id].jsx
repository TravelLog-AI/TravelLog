import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import TripHeading from '../../components/TripDetails/TripHeading';
import { showToast } from '../../utils/toast';
import { fetchDoc } from '../../utils/db';
import { tripDetailTabs } from '../../constants/arrays';
import { TripOverviewContent } from '../../components/TripDetails/TripOverview';
import { Divider } from 'react-native-paper';
import Landmarks from '../../components/Landmarks';
import TripItinerary from '../../components/TripDetails/TripItinerary';
import TripAdvisor from '../../components/TripDetails/TripAdvisor';

const OverviewBlog = ({blogData, tripId}) => {
  return (
    <ScrollView style={{ paddingBottom: 20, height: "100%" }}>
      <View style={{ marginVertical: 10 }}>
        <TripOverviewContent tripData={blogData?.tripData?.tripData?.trip} />
      </View>

      <Divider style={{ marginVertical: 10 }} />

      <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 10 }}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
          }}
        >
          {blogData.title}
        </Text>
        <Text
          style={{
            fontFamily: "open-sans",
            fontSize: 15,
          }}
        >
          {blogData.description}
        </Text>
      </View>

      <Divider style={{ marginVertical: 10 }} />

      <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 10 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
          Landmarks
        </Text>
        <Landmarks
          tripData={blogData?.tripData?.tripData?.trip}
          tripId={tripId}
          coordinates={blogData?.tripData?.coordinates}
        />
      </View>
    </ScrollView>
  );
}

export default function BlogDetails() {
  const [blogData, setBlogData] = useState({});
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
    const { id } = useLocalSearchParams();

    useEffect(() => {
      fetchTripData();
    }, []);

    const fetchTripData = async () => {
      try {
        const blogResponse = await fetchDoc("Blogs", id);
        const tripResponse = await fetchDoc(
          "Trips",
          blogResponse.docData.tripId
        );

        setBlogData({
          ...blogResponse.docData,
          tripData: tripResponse.docData,
        });

        console.log(blogResponse, 'blogResponse');
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "Something went wrong. Please try again.", error);
      }
    }

  return (
    <View style={{ height: "100%" }}>
      <TripHeading
        tripData={blogData?.tripData || {}}
        currentTripTab={currentTripTab}
        setCurrentTripTab={setCurrentTripTab}
      />

      {currentTripTab === tripDetailTabs[0].name ? (
        <OverviewBlog blogData={blogData} tripid={id} />
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary
          itineraryData={blogData?.tripData?.tripData?.trip.itinerary || []}
          tripLandmarks={blogData?.tripData?.tripData?.trip?.landmarks || []}
          tripId={id}
          />
      ) : (
        <TripAdvisor />
      )}

    </View>
  );
}
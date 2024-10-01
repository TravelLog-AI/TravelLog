import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { showToast } from "../../utils/toast";
import axios from "axios";
import { googlePlaceAPI } from "../../constants/env";
import { FAB } from "react-native-paper";
import { getPhoto } from "../../utils/map";
import { updateSingleDoc } from "../../utils/db";
import { arrayUnion } from "firebase/firestore";
import NotFound from "../NotFound";
import { fetchPlaceDetails } from "../../utils/googleMap";
import PlaceDetails from "../PlaceDetails";
import useScale from "../../hooks/animations/useScale";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Landmark from "./Landmark";

const LandmarkToAdd = ({ place, handleAdd }) => {
  const photoLink = place?.photos
    ? getPhoto(place?.photos[0]?.photo_reference)
    : require("../../assets/images/not_found.jpg");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginRight: 10,
        backgroundColor: Colors.LIGHT_BACKGROUND,
        alignSelf: "flex-start",
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: photoLink }}
        style={{ width: 40, height: "100%", borderRadius: 10 }}
      />
      <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: "open-sans-medium", fontSize: 15 }}>
          {place.name}
        </Text>
      </View>
      <View>
        <FAB
          icon="plus"
          size="small"
          color={Colors.PRIMARY}
          onPress={handleAdd}
          backgroundColor={Colors.LIGHT_PRIMARY}
        />
      </View>
    </View>
  );
};

export default function Landmarks({ tripData, coordinates, tripId, isOwner }) {
  const [landmarkList, setLandmarkList] = useState([]);
  const [landmarksInItinerary, setLandmarksInItinerary] = useState([]);

  useEffect(() => {
    if (tripData && landmarkList.length === 0) {
      fetchLandmarks();
    }
  }, [tripData]);

  useEffect(() => {
    if (tripData && landmarkList.length > 0) {

      // Set display landmarks
      if (tripData?.landmarks && tripData?.landmarks?.length > 0) {
        setLandmarksInItinerary(tripData.landmarks);
        return;
      }

      // Handle initialize landmarks in trip data
      if (isOwner) {
        const landmarkNames = [];
        tripData.itinerary.forEach((day) => {
          day.activities.forEach((activity) => {
            landmarkNames.push(activity.name);
          });
        });
  
        const landmarkExisted = landmarkList.filter((landmark) =>
          landmarkNames.includes(landmark.name)
        );
  
        setLandmarksInItinerary(landmarkExisted);
        handleAddLandmarks(landmarkExisted);
      }
    }
  }, [tripData, landmarkList]);
  const fetchLandmarks = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates?.lat},${coordinates?.lng}&radius=5000&type=tourist_attraction&fields=name,rating,formatted_address,editorial_summary,opening_hours,photos&key=${googlePlaceAPI}`
      );

      if (tripData.landmarks && tripData.landmarks.length > 0) {
        const filteredList = response.data.results.filter((landmark) => {
          // Find if landmark already exist in trip data
          const landmarkExist = tripData.landmarks.find((tripLandmark) => tripLandmark.name === landmark.name);
          return !landmarkExist;
        });
        setLandmarkList(filteredList);
      }
      setLandmarkList(response.data.results);
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };

  const handleAddLandmarks = async (landmarksToAdd) => {
    try {
      const detailedLandmarks = await Promise.all(
        landmarksToAdd.map(async (landmark) => {
          const detailedLandmark = await fetchPlaceDetails(landmark.place_id);
          const dataToAdd = {
            name: detailedLandmark.name,
            photos: detailedLandmark.photos,
            reference: detailedLandmark.reference,
            geo_coordinates: detailedLandmark.geometry.location,
            opening_hours: detailedLandmark?.opening_hours || {},
            details: detailedLandmark?.editorial_summary?.overview || "",
            types: detailedLandmark?.types || [],
            rating: detailedLandmark?.rating || 0,
            place_id: detailedLandmark.place_id,
          };

          return dataToAdd;
        })
      )
      await updateSingleDoc("Trips", tripId, {
        "tripData.trip.landmarks": arrayUnion(...detailedLandmarks),
      });
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };

  const handleAddLandmark = (landmark) => {
    const isLandmarkValid = checkIsLandmarkValid(landmark);
    if (!isLandmarkValid) {
      showToast("error", "Landmark Already Existed", "");
      return;
    }
    handleAddLandmarks([landmark]);
  };

  const checkIsLandmarkValid = (landmark) => {
    if (!tripData?.landmarks || tripData?.landmarks?.length === 0) {
      return true;
    }

    const isAlreadyExist = tripData.landmarks.find((existingLandmark) => {
      return existingLandmark.name === landmark.name;
    });

    return !isAlreadyExist;
  };

  return (
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          marginTop: 20,
          marginBottom: 50,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >

        {landmarksInItinerary.length > 0 ? (
          landmarksInItinerary.map((landmark, index) => {
            return <Landmark key={index} place={landmark} placeList={landmarksInItinerary} tripId={tripId} />;
          })
        ) : (
          <NotFound text="No Landmarks Found" />
        )}

        {isOwner && (
          <ScrollView horizontal>
            {landmarkList.length > 0 &&
              landmarkList.map((landmark, index) => {
                return (
                  <LandmarkToAdd
                    key={index}
                    place={landmark}
                    handleAdd={() => handleAddLandmark(landmark)}
                  />
                );
              })}
          </ScrollView>
        )}
      </View>
  );
}
  
import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { primaryStyles } from "../../styles/primary";
import { Colors } from "../../constants/Colors";
import SelectPlace from "../Modals/Create/SelectPlace";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TextInput } from "react-native-paper";
import moment from "moment";
import SelectDate from "../Modals/Create/SelectDate";
import PrimaryButton from "../Primary/Button";
import SelectTravelers from "../Modals/Create/SelectTravelers";
import { createStyles } from "./styles";
import SelectBudget from "../Modals/Create/SelectBudget";
import { useRouter } from "expo-router";
import { showToast } from "../../utils/toast";
import { AI_PROMPT } from "../../constants/AI";
import { chatSession } from "../../config/AIModal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { UserContext } from "../../context/UserContext";
import GeneratingAIScreen from "./GeneratingAIScreen";
import { fetchPlaceDetails, fetchPlaceId, GetPhotoRef } from "../../utils/googleMap";

export default function CreateTrip({ onClose }) {
  const [address, setAddress] = useState();
  const [isSelectPlaceOpen, setIsSelectPlaceOpen] = useState(false);
  const [isSelectDateOpen, setIsSelectDateOpen] = useState(false);
  const [isOpenGeneratingAI, setIsOpenGeneratingAI] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [selectedBudget, setSelectedBudget] = useState("Cheap");

  const router = useRouter();
  const { userData } = useContext(UserContext);

  const tripsCollection = collection(db, "Trips");

  const generateAiTrip = async () => {
    try {
      setIsOpenGeneratingAI(true);
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{departureLocation}",
        userData?.address?.name
      )
        .replace("{arrivalLocation}", address.name)
        .replace("{startDate}", parsedStartDate.toDateString())
        .replace("{endDate}", parsedEndDate.toDateString())
        .replace("{numberOfTravelers}", numberOfTravelers)
        .replace("{budget}", selectedBudget);

      // Generate AI Trip
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const tripRes = JSON.parse(result.response.text());
      const createdAt = new Date();

      // Get photo ref to display it
      const photoRef = await GetPhotoRef(address.name);

      // Fetch place details for each place in itinerary
      const newItinerary = [];

      for (const itineraryDay of tripRes.trip.itinerary) {
        const newItineraryActivities = [];
        for (const activity of itineraryDay.activities) {
          const placeId = await fetchPlaceId(activity.name);
          const placeDetails = await fetchPlaceDetails(placeId);
          const newActivity = {
            ...activity,
            opening_hours: placeDetails?.current_opening_hours || {},
            types: placeDetails?.types || [],
            url: placeDetails?.url || "",
            rating: {
              rating: placeDetails?.rating || 0,
              totalRating: placeDetails?.user_ratings_total || 0,
            },
          };
          console.log({placeDetails, name: activity.name}, 'place details');
          newItineraryActivities.push(newActivity);
        }

        newItinerary.push({activities: newItineraryActivities, ...itineraryDay});
      }

      const {trip} = tripRes;
      
      // Add trip to DB
      const newTripDoc = await addDoc(tripsCollection, {
        userId: userData.docId,
        tripData: { trip: {...trip, itinerary: newItinerary}}, // AI Result
        createdAt,
        photoRef,
        coordinates: address.coordinates,
      });

      setIsOpenGeneratingAI(false);
      onClose();
      router.push(`trip/${newTripDoc.id}`);
    } catch (error) {
      console.log("Something Went Wrong: ", error);
      showToast("error", "Something Went Wrong", error);
      setIsOpenGeneratingAI(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <GeneratingAIScreen
        open={isOpenGeneratingAI}
        onClose={() => setIsOpenGeneratingAI(false)}
      />
      <SelectDate
        open={isSelectDateOpen}
        onClose={() => setIsSelectDateOpen(false)}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <SelectPlace
        open={isSelectPlaceOpen}
        onClose={() => setIsSelectPlaceOpen(false)}
        setAddress={setAddress}
      />
      <Text style={[primaryStyles.heading, createStyles.heading]}>
        Let's Plan Your New Trip ✍🏻
      </Text>
      <Text style={[primaryStyles.subtitle, createStyles.subtitle]}>
        Create Your New Trip Effortlessly With The Power Of AI
      </Text>

      {/* Destination */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Destination 🗺️
      </Text>
      <TextInput
        placeholder="Where"
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome6
                name="map-location-dot"
                size={15}
                color={Colors.DARK_GREY}
              />
            )}
          />
        }
        onPress={() => setIsSelectPlaceOpen(true)}
        value={address?.name || ""}
        style={{ marginTop: 10, backgroundColor: Colors.PRIMARY_BACKGROUND }}
      />

      {/* When */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        When 📅
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="From"
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome6
                  name="calendar-days"
                  size={15}
                  color={Colors.DARK_GREY}
                />
              )}
            />
          }
          style={{
            width: "49%",
            fontSize: 15,
            backgroundColor: Colors.PRIMARY_BACKGROUND,
          }}
          value={moment(startDate)?.format("MMM DD, YYYY") || ""}
          onPress={() => setIsSelectDateOpen(true)}
        />
        <TextInput
          placeholder="To"
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome6
                  name="calendar-days"
                  size={15}
                  color={Colors.DARK_GREY}
                />
              )}
            />
          }
          style={{
            width: "49%",
            fontSize: 15,
            backgroundColor: Colors.PRIMARY_BACKGROUND,
          }}
          value={moment(endDate)?.format("MMM DD, YYYY") || ""}
          onPress={() => setIsSelectDateOpen(true)}
        />
      </View>

      {/* Number of Travelers */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Number of Travelers 🧳
      </Text>
      <SelectTravelers
        numberOfTravelers={numberOfTravelers}
        setNumberOfTravelers={setNumberOfTravelers}
      />

      {/* Budget */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Your Budget 💲
      </Text>
      <SelectBudget
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />

      <PrimaryButton
        onPress={generateAiTrip}
        style={{ width: "100%", padding: 10, marginTop: 30 }}
        badgeContent="AI Powered 🤖"
        disabled={!address || !startDate || !endDate}
      >
        Generate Trip
      </PrimaryButton>
    </ScrollView>
  );
}

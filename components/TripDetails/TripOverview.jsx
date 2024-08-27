import { View, Text } from "react-native";
import React from "react";
import { tripDetailsStyle } from "../../app/trip/style";
import { Colors } from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../Primary/Button";

export default function TripOverview({tripData}) {
  return (
    <>
      <Text style={tripDetailsStyle.heading}>Overview</Text>
      <Text
        style={[
          tripDetailsStyle.heading,
          { color: Colors.BLACK, marginTop: 10 },
        ]}
      >
        {tripData.destination}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome5 name="calendar-alt" size={10} color="grey" />
          <Text style={tripDetailsStyle.subtitle}>
            {tripData.start_date} - {tripData.end_date}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome5 name="users" size={10} color="grey" />
          <Text style={tripDetailsStyle.subtitle}>
            {tripData.traveler_count} people
          </Text>
        </View>
      </View>

      {/* Overview sub tabs */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 20,
          gap: 5,
        }}
      >
        <PrimaryButton
          labelStyle={tripDetailsStyle.subTabText}
          style={tripDetailsStyle.subTab}
        >
          Flight
        </PrimaryButton>
        <PrimaryButton
          labelStyle={tripDetailsStyle.subTabText}
          style={tripDetailsStyle.subTab}
        >
          Lodging
        </PrimaryButton>
        <PrimaryButton
          labelStyle={tripDetailsStyle.subTabText}
          style={tripDetailsStyle.subTab}
        >
          Landmarks
        </PrimaryButton>
      </View>
    </>
  );
}

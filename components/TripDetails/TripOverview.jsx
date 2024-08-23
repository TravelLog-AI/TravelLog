import { View, Text } from "react-native";
import React from "react";
import { tripOverviewStyle } from "../../app/trip/style";
import { Colors } from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../Primary/Button";

export default function TripOverview() {
  return (
    <>
      <Text style={tripOverviewStyle.heading}>Overview</Text>
      <Text
        style={[
          tripOverviewStyle.heading,
          { color: Colors.BLACK, marginTop: 10 },
        ]}
      >
        Victoria, BC, Canada
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
          <Text style={tripOverviewStyle.subtitle}>
            20 Aug 2024 - 31 Aug 2024
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
          <Text style={tripOverviewStyle.subtitle}>2 people</Text>
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
          labelStyle={tripOverviewStyle.subTabText}
          style={tripOverviewStyle.subTab}
        >
          Flight
        </PrimaryButton>
        <PrimaryButton
          labelStyle={tripOverviewStyle.subTabText}
          style={tripOverviewStyle.subTab}
        >
          Lodging
        </PrimaryButton>
        <PrimaryButton
          labelStyle={tripOverviewStyle.subTabText}
          style={tripOverviewStyle.subTab}
        >
          Landmarks
        </PrimaryButton>
      </View>
    </>
  );
}

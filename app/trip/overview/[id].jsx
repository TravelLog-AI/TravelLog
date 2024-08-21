import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors'
import PrimaryButton from '../../../components/Primary/Button'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { tripOverviewStyle } from './style'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';

export default function TripOverview() {
  return (
    <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1709999370305-cf9b7c368cd2?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ width: "100%", height: "40%" }}
      />

      {/* Tab Buttons */}
      <View style={tripOverviewStyle.tabButtonContainer}>
        <PrimaryButton
          style={{
            width: 60,
            borderRadius: 10,
            shadowColor: "rgba(100, 100, 111, 1)",
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.2,
            shadowRadius: 29 / 2,
            elevation: 7,
          }}
        >
          <FontAwesome6 name="list-alt" size={24} color="white" />
        </PrimaryButton>
        <PrimaryButton
          style={{
            width: 60,
            borderRadius: 10,
            backgroundColor: Colors.WHITE,
            shadowColor: "rgba(100, 100, 111, 1)",
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.2,
            shadowRadius: 29 / 2,
            elevation: 7,
          }}
        >
          <Entypo name="map" size={24} color={Colors.PRIMARY} />
        </PrimaryButton>
        <PrimaryButton
          style={{
            width: 60,
            borderRadius: 10,
            backgroundColor: Colors.WHITE,
            shadowColor: "rgba(100, 100, 111, 1)",
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.2,
            shadowRadius: 29 / 2,
            elevation: 7,
          }}
        >
          <Ionicons name="people" size={24} color={Colors.PRIMARY} />
        </PrimaryButton>
      </View>

      {/* Overview heading and trip info */}
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
          marginTop: 10,
          gap: 5
        }}
      >
        <PrimaryButton labelStyle={{fontSize: 15}} style={tripOverviewStyle.subTab}>Flight</PrimaryButton>
        <PrimaryButton labelStyle={{fontSize: 15}} style={tripOverviewStyle.subTab}>Lodging</PrimaryButton>
        <PrimaryButton labelStyle={{fontSize: 15}} style={tripOverviewStyle.subTab}>Landmarks</PrimaryButton>
      </View>
    </View>
  );
}


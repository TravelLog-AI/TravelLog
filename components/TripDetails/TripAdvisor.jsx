import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { tripDetailsStyle } from '../../app/trip/style'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

export default function TripAdvisor() {
  return (
    <ScrollView>
      <Text style={tripDetailsStyle.heading}>Advisor</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <MaterialIcons
          name="error-outline"
          size={24}
          color={Colors.DARK_GREY}
        />
        <Text
          style={{
            fontFamily: "open-sans-medium",
            fontSize: 15,
            textAlign: "center",
            color: Colors.DARK_GREY,
          }}
        >
          There is no advisor currently related to your travel destination.
        </Text>
      </View>
      {/* <View style={{margin: 20, marginRight: 40, gap: 20}}>
        <BlogPost />
        <BlogPost />
      </View> */}
    </ScrollView>
  );
}
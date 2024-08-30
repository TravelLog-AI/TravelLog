import { View, Text, Image, Touchable, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function TripSummary({trip}) {
    // console.log(trip, 'trip');
    // console.log('render');
    const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={() => router.push(`trip/${trip.id}`)}>
        <View
        style={{
            flexDirection: "row",
            width: "100%",
            marginHorizontal: 20,
            alignItems: "center",
            gap: 20,
        }}
        >
        <View style={{ flex: 1, height: 80, width: "100%" }}>
            <Image
            source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${trip?.photoRef || ''}&key=${
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                }` || require('../assets/images/not_found.jpg'),
            }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
        </View>
        <View style={{ flex: 3, gap: 5 }}>
            <Text style={{ fontFamily: "open-sans-bold", fontSize: 15 }}>
            {trip.tripData.trip.destination}
            </Text>
            <Text
            style={{
                fontFamily: "open-sans-medium",
                fontSize: 10,
                color: Colors.DARK_GREY,
            }}
            >
            {trip.tripData.trip.start_date} - {trip.tripData.trip.end_date} 
            </Text>
        </View>
        </View>
    </TouchableWithoutFeedback>
  );
}
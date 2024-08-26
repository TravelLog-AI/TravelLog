import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { tripDetailsStyle } from '../../app/trip/style'
import { Colors } from '../../constants/Colors'
import ItineraryCard from '../ItineraryCard'

export default function TripItinerary() {
  return (
    <ScrollView>
      <Text style={tripDetailsStyle.heading}>Itinerary</Text>
      <ScrollView horizontal style={{display: 'flex', flexDirection: 'row', margin: 10}}>
        <View
          style={{
            gap: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.SECONDARY,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 10
          }}
        >
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>26</Text>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>AUG</Text>
        </View>
        <View 
          style={{
            gap: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.SECONDARY,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 10
          }}
        >
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>26</Text>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>AUG</Text>
        </View>
        <View 
          style={{
            gap: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.SECONDARY,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 10
          }}
        >
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>26</Text>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>AUG</Text>
        </View>
        <View 
          style={{
            gap: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.SECONDARY,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 10
          }}
        >
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>26</Text>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>AUG</Text>
        </View>
        <View 
          style={{
            gap: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.SECONDARY,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 10
          }}
        >
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>26</Text>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 20, color: Colors.SECONDARY}}>AUG</Text>
        </View>
      </ScrollView>
      <View style={{padding: 20, gap: 10}}>
        <ItineraryCard />
        <ItineraryCard />
        <ItineraryCard />
      </View>
    </ScrollView>
  )
}
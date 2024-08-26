import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function ItineraryCard() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        // alignContent: 'center',
        backgroundColor: Colors.PRIMARY_BACKGROUND,
        height: 150,
        borderRadius: 20,
      }}
    >
      <TimeLineComp />
      <View style={{ marginHorizontal: 20, gap: 10 }}>
        <Text style={{fontFamily: 'open-sans-bold', fontSize: 20,}}>Visit national zoo Visit national zoo Visit national zoo Visit national zoo Visit national zoo</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <AntDesign name="clockcircle" size={15} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 15,
              color: Colors.DARK_GREY,
            }}
          >
            2:00pm
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Entypo name="location-pin" size={15} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 15,
              color: Colors.DARK_GREY,
            }}
          >
            BC National Zoo
          </Text>
        </View>
      </View>
    </View>
  );
}


const TimeLineComp = () => {
    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5}}>
            <View style={{backgroundColor: Colors.SECONDARY, width: 1, height: '35%'}}></View>
            <View style={{backgroundColor: Colors.SECONDARY, width: 30, height: 30, borderRadius: 15}}></View>
            <View style={{backgroundColor: Colors.SECONDARY, width: 1, height: '35%'}}></View>
        </View>
    )
}
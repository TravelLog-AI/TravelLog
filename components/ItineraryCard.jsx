import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ItineraryCard({activity}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        paddingRight: 30,
        alignItems: "center",
        maxHeight: 300,
        flexShrink: 1,
        backgroundColor: Colors.LIGHT_BACKGROUND,
        borderRadius: 20,
      }}
    >
      <TimeLineComp />
      <View style={{ marginHorizontal: 20, gap: 10 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 15 }}>
          {activity.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <FontAwesome name="book" size={12} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 12,
              color: Colors.DARK_GREY,
            }}
          >
            {activity.details}
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
          <AntDesign name="clockcircle" size={12} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 12,
              color: Colors.DARK_GREY,
            }}
          >
            {activity.best_time_to_visit}
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
          <Entypo name="ticket" size={12} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 12,
              color: Colors.DARK_GREY,
            }}
          >
            {activity.ticket_pricing}
          </Text>
        </View>
      </View>
    </View>
  );
}


const TimeLineComp = () => {
    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5}}>
            <View style={{backgroundColor: Colors.PRIMARY, width: 1, height: '35%'}}></View>
            <View style={{backgroundColor: Colors.PRIMARY, width: 30, height: 30, borderRadius: 15}}></View>
            <View style={{backgroundColor: Colors.PRIMARY, width: 1, height: '35%'}}></View>
        </View>
    )
}
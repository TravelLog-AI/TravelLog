import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tripDetailsStyle } from '../../app/trip/style'
import { Colors } from '../../constants/Colors'
import ItineraryCard from '../ItineraryCard'
import { TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function TripItinerary({itineraryData}) {
  const [currentItineraryDate, setCurrentItineraryDate] = useState(0);
  const [dayActivities, setDayActivities] = useState(itineraryData[0].activities);

  useEffect(() => {
    if (currentItineraryDate >= 0) {
      setDayActivities(itineraryData[currentItineraryDate].activities);
    }
  }, [currentItineraryDate]);

  return (
    <ScrollView>
      <Text style={tripDetailsStyle.heading}>Itinerary</Text>
      <ScrollView horizontal style={{display: 'flex', flexDirection: 'row', margin: 10}}>
        {
          itineraryData.map((itinerary, index) => {
            return (
              <TouchableOpacity
              key={index}
              onPress={() => setCurrentItineraryDate(index)}
              >
                <View
                  style={{
                    gap: 1,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: Colors.SECONDARY,
                    borderRadius: 20,
                    padding: 5,
                    marginHorizontal: 10,
                    backgroundColor:
                      currentItineraryDate === index
                        ? Colors.SECONDARY
                        : Colors.WHITE,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 20,
                      color: currentItineraryDate === index ? Colors.WHITE : Colors.SECONDARY,
                    }}
                  >
                    {itinerary.date.split(" ")[1].split(",")}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 20,
                      color: currentItineraryDate === index ? Colors.WHITE : Colors.SECONDARY,
                    }}
                  >
                    {itinerary.date.split(" ")[0].toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
      <View style={{padding: 20, gap: 10}}>
        {/* <ItineraryCard />
        <ItineraryCard />
        <ItineraryCard /> */}
        {
          dayActivities.length > 0 && dayActivities.map((activity, index) => {
            return (
              <ItineraryCard key={index} activity={activity} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}
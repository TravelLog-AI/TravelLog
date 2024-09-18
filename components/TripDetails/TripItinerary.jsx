import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { tripDetailsStyle } from '../../app/trip/style'
import { Colors } from '../../constants/Colors'
import ItineraryCard from '../ItineraryCard'
import { TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { tabsStyles } from '../../app/(tabs)/styles'
import PrimaryButton from '../Primary/Button'
import AddNewItinerary from '../Modals/AddNewItinerary'

export default function TripItinerary({tripId, itineraryData, tripLandmarks}) {
  const [currentItineraryDate, setCurrentItineraryDate] = useState(0);
  const [dayActivities, setDayActivities] = useState(itineraryData[0].activities);
  const [isOpenAddNewPlace, setIsOpenAddNewPlace] = useState(false);

  useEffect(() => {
    if (currentItineraryDate >= 0) {
      setDayActivities(itineraryData[currentItineraryDate].activities);
    }
  }, [currentItineraryDate]);

  return (
    <>
      <ScrollView>
      <AddNewItinerary
        open={isOpenAddNewPlace}
        onClose={() => setIsOpenAddNewPlace(false)}
        tripLandmarks={tripLandmarks}
        itineraryData={itineraryData}
        tripId={tripId}
        currentItineraryDate={currentItineraryDate}
      />
        <Text style={tripDetailsStyle.heading}>Itinerary</Text>
        <ScrollView
          horizontal
          style={{ display: "flex", flexDirection: "row", margin: 10 }}
        >
          {itineraryData.map((itinerary, index) => {
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
                      color:
                        currentItineraryDate === index
                          ? Colors.WHITE
                          : Colors.SECONDARY,
                    }}
                  >
                    {itinerary.date.split(" ")[1].split(",")}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 20,
                      color:
                        currentItineraryDate === index
                          ? Colors.WHITE
                          : Colors.SECONDARY,
                    }}
                  >
                    {itinerary.date.split(" ")[0].toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={{ padding: 20, gap: 10 }}>
          {dayActivities.length > 0 &&
            dayActivities.map((activity, index) => {
              return <ItineraryCard key={index} activity={activity} />;
            })}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <PrimaryButton
            variant="standard"
            labelStyle={{ fontSize: 15, fontFamily: "open-sans-bold" }}
            onPress={() => setIsOpenAddNewPlace(true)}
          >
            Add a new place
          </PrimaryButton>
        </View>
      </ScrollView>
    </>
  );
}
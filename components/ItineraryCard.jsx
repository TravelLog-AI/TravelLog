import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Colors } from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { days } from '../constants/arrays';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import { TouchableHighlight } from 'react-native';
import PrimaryButton from './Primary/Button';
import { updateSingleDoc } from '../utils/db';
import { showToast } from '../utils/toast';
import { updateActivityInItinerary } from '../utils/formatData';

export default function ItineraryCard({currentIndex, tripId, activity, itineraryData, currentDayIndex}) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isExpandHours, setIsExpandHours] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState({updatedIndex: -1, updatedNote: activity?.note || ''});
  const [parentHeight, setParentHeight] = useState(0);

  const openingHours = useMemo(() => {
    return activity?.opening_hours?.weekday_text || []
  }, [activity]);

  const todayIndex = new Date().getDay();
  const today = days[todayIndex];
  const todayHours = openingHours.find((hour) => hour.split(':')[0] === today);

  const handleAddNote = async () => {
    if (!note) return;
    setIsLoading(true);
    try {
      const updatedActivityData = {
        ...activity,
        note: note.updatedNote,
      };

      const newItineraryData = updateActivityInItinerary(
        updatedActivityData,
        note.updatedIndex,
        itineraryData,
        currentDayIndex
      );

      await updateSingleDoc("Trips", tripId, {
        "tripData.trip.itinerary": [...newItineraryData],
      });
      setIsLoading(false);
    } catch (error) { 
      console.log('There was an error: ' ,error);
      showToast("error", "There was an error", error);
      setIsLoading(false);
    }
  }
  return (
    <TouchableHighlight
      onPress={() => setIsAddingNote(!isAddingNote)}
      style={{ backgroundColor: Colors.LIGHT_BACKGROUND, borderRadius: 20 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 15,
          paddingRight: 30,
          backgroundColor: Colors.LIGHT_BACKGROUND,
          borderRadius: 20,
          alignItems: "center",
          alignSelf: "flex-start", // Ensure the View only grows to fit its content
          width: "100%",
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setParentHeight(height);
        }}
      >
        <TimeLineComp parentHeight={parentHeight} />
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <Text style={{ fontFamily: "open-sans-bold", fontSize: 15 }}>
            {activity.name}
          </Text>
          {isAddingNote && (
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <TextInput
                placeholder="Add notes..."
                style={{
                  backgroundColor: Colors.GREY,
                  fontSize: 12,
                  padding: 0,
                  margin: 0,
                  flex: 4,
                }}
                contentStyle={{ padding: 0, margin: 0 }}
                multiline
                value={note.updatedNote}
                onChangeText={(text) => setNote({updatedIndex: currentIndex, updatedNote: text})}
              />
              <PrimaryButton
                variant="standard"
                style={{ padding: 10, borderRadius: 10, flex: 1 }}
                labelStyle={{ fontSize: 15 }}
                onPress={handleAddNote}
                loading={isLoading}
              >
                Save
              </PrimaryButton>
            </View>
          )}
          {activity.note && (
            <Text style={{ fontFamily: "open-sans", fontSize: 12 }}>
              {activity.note}
            </Text>
          )}
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
              alignItems: isExpandHours ? "flex-start" : "center",
            }}
          >
            <AntDesign name="clockcircle" size={12} color={Colors.DARK_GREY} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              {openingHours.length > 0 ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    alignItems: "flex-start",
                  }}
                >
                  {isExpandHours ? (
                    openingHours.map((day) => (
                      <Text
                        style={{
                          fontFamily: "open-sans-medium",
                          fontSize: 12,
                          color: Colors.DARK_GREY,
                        }}
                      >
                        {day}
                      </Text>
                    ))
                  ) : (
                    <Text
                      style={{
                        fontFamily: "open-sans-medium",
                        fontSize: 12,
                        color: Colors.DARK_GREY,
                      }}
                    >
                      {todayHours}
                    </Text>
                  )}
                </View>
              ) : activity.best_time_to_visit ? (
                <Text
                  style={{
                    fontFamily: "open-sans-medium",
                    fontSize: 12,
                    color: Colors.DARK_GREY,
                  }}
                >
                  {activity.best_time_to_visit}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "open-sans-medium",
                    fontSize: 12,
                    color: Colors.DARK_GREY,
                  }}
                >
                  Open 24 hours
                </Text>
              )}
              {openingHours.length > 0 && (
                <TouchableOpacity
                  onPress={() => setIsExpandHours(!isExpandHours)}
                >
                  <AntDesign
                    name={isExpandHours ? "caretup" : "caretdown"}
                    size={12}
                    color={Colors.DARK_GREY}
                  />
                </TouchableOpacity>
              )}
            </View>
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

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="category" size={12} color={Colors.DARK_GREY} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {activity?.types && activity.types.length > 0 ? (
                activity.types.map((type, index) => {
                  return (
                    <Text
                      style={{
                        fontFamily: "open-sans-medium",
                        fontSize: 12,
                        color: Colors.DARK_GREY,
                      }}
                    >
                      {type},
                    </Text>
                  );
                })
              ) : (
                <Text
                  style={{
                    fontFamily: "open-sans-medium",
                    fontSize: 12,
                    color: Colors.DARK_GREY,
                  }}
                >
                  Unknown
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}


const TimeLineComp = ({parentHeight}) => {


    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
        }}
      >
        <View style={{ backgroundColor: Colors.PRIMARY, width: 1, height: parentHeight ? parentHeight * 0.35 : 0 }}></View>
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
        ></View>
        <View style={{ backgroundColor: Colors.PRIMARY, width: 1, height: parentHeight ? parentHeight * 0.35 : 0 }}></View>
      </View>
    );
}
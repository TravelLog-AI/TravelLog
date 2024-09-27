import { View, Text, Animated } from "react-native";
import React, { useMemo, useState } from "react";
import { Colors } from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import PrimaryButton from "./Primary/Button";
import { updateSingleDoc } from "../utils/db";
import { showToast } from "../utils/toast";
import { updateActivityInItinerary } from "../utils/formatData";
import { Swipeable } from "react-native-gesture-handler";
import PlaceDetails from "./PlaceDetails";

export default function ItineraryCard({
  currentIndex,
  drag,
  isActive,
  tripId,
  activity,
  itineraryData,
  currentDayIndex,
  isOwner,
}) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState({
    updatedIndex: -1,
    updatedNote: activity?.note || "",
  });
  const [parentHeight, setParentHeight] = useState(0);

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
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const newActivity = itineraryData[currentDayIndex].activities.filter(
        (_activity, index) => index !== currentIndex
      );

      const newItinerary = itineraryData.map((itineraryDay, index) => {
        if (index === currentDayIndex) {
          return {
            ...itineraryDay,
            activities: newActivity,
          };
        }

        return itineraryDay;
      });

      await updateSingleDoc("Trips", tripId, {
        "tripData.trip.itinerary": [...newItinerary],
      });

      showToast("success", "Activity deleted successfully");
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: Colors.ERROR,
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          padding: 10,
          borderRadius: 15,
          // height: '100%'
          marginVertical: 15,
          gap: 10,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <FontAwesome name="trash-o" size={24} color={Colors.WHITE} />
        </Animated.View>
        <Animated.Text
          style={{
            fontFamily: "open-sans-bold",
            color: Colors.WHITE,
            transform: [{ scale }],
          }}
        >
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => {
        if (isOwner) {
          return renderRightAction(progress, dragX);
        }
      }}
    >
      <TouchableHighlight
        onPress={() => {
          if (isOwner) setIsAddingNote(!isAddingNote);
        }}
        style={{
          backgroundColor: Colors.LIGHT_BACKGROUND,
          borderRadius: 20,
          margin: 15,
        }}
        onLongPress={() => {
          if (isOwner) {
            drag();
          }
        }}
        disabled={isActive}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 15,
            backgroundColor: Colors.LIGHT_BACKGROUND,
            borderRadius: 20,
            alignItems: "center",
            alignSelf: "flex-start", // Ensure the View only grows to fit its content
            width: "100%",
            gap: 10,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setParentHeight(height);
          }}
        >
          <TimeLineComp style={{ flex: 1 }} parentHeight={parentHeight} />
          <View style={{ marginHorizontal: 20, gap: 10, flex: 8 }}>
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
                  onChangeText={(text) =>
                    setNote({ updatedIndex: currentIndex, updatedNote: text })
                  }
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
            <PlaceDetails place={activity} />
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const TimeLineComp = ({ parentHeight, style }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        alignSelf: "flex-start",
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: 1,
          height: parentHeight ? parentHeight * 0.35 : 0,
        }}
      ></View>
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: 30,
          height: 30,
          borderRadius: 15,
        }}
      ></View>
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: 1,
          height: parentHeight ? parentHeight * 0.35 : 0,
        }}
      ></View>
    </View>
  );
};

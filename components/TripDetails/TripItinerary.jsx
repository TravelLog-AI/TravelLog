import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { tripDetailsStyle } from '../../app/trip/style';
import { Colors } from '../../constants/Colors';
import ItineraryCard from '../ItineraryCard';
import { TouchableOpacity } from 'react-native';
import PrimaryButton from '../Primary/Button';
import AddNewItinerary from '../Modals/AddNewItinerary';
import DraggableFlatList, { ScaleDecorator} from 'react-native-draggable-flatlist';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { updateSingleDoc } from '../../utils/db';
import { showToast } from '../../utils/toast';

export default function TripItinerary({tripId, itineraryData, tripLandmarks}) {
  const [currentItineraryDate, setCurrentItineraryDate] = useState(0);
  const [dayActivities, setDayActivities] = useState(itineraryData[0]?.activities || []);
  const [isOpenAddNewPlace, setIsOpenAddNewPlace] = useState(false);

  useEffect(() => {
    if (currentItineraryDate >= 0) {
      setDayActivities(itineraryData[currentItineraryDate].activities);
    }
  }, [currentItineraryDate, itineraryData]);

  const renderDraggableItinerary = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <ItineraryCard
          currentIndex={currentItineraryDate}
          tripId={tripId}
          activity={item}
          itineraryData={itineraryData}
          currentDayIndex={currentItineraryDate}
          drag={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    )
  }
  const handleUpdateItinerary = async (newItineraryData) => {
    try {
      const newItinerary = itineraryData.map((itineraryDay, index) => {
        if (index === currentItineraryDate) {
          return newItineraryData;
        }           
        
        return itineraryDay;
      });

      await updateSingleDoc("Trips", tripId, {
        "tripData.trip.itinerary": newItinerary,
      });

      showToast('success', 'Itinerary updated successfully');
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'Error updating itinerary', error);
    }
  }
  

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingBottom: 150 }}>
      <AddNewItinerary
        open={isOpenAddNewPlace}
        onClose={() => setIsOpenAddNewPlace(false)}
        tripLandmarks={tripLandmarks}
        itineraryData={itineraryData}
        tripId={tripId}
        currentItineraryDate={currentItineraryDate}
      />
      <Text style={tripDetailsStyle.heading}>Itinerary</Text>

      <View>
        <FlatList
          horizontal
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 10,
            flexGrow: 0,
          }}
          showsHorizontalScrollIndicator={false}
          data={itineraryData}
          renderItem={({ item, index }) => (
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
                  {item.date.split(" ")[1].split(",")}
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
                  {item.date.split(" ")[0].toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <PrimaryButton
        variant="standard"
        style={{ padding: 10, alignSelf: "flex-end", marginHorizontal: 20 }}
        labelStyle={{ fontSize: 12, fontFamily: "open-sans-medium" }}
        onPress={() =>
          handleUpdateItinerary({
            ...itineraryData[currentItineraryDate],
            activities: dayActivities,
          })
        }
      >
        Save Arrangement
      </PrimaryButton>

      <DraggableFlatList
        data={dayActivities}
        onDragEnd={({ data }) => setDayActivities(data)}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderDraggableItinerary}
      />

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
    </GestureHandlerRootView>
  );
}
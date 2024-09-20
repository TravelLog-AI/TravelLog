import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { modalStyles } from './styles';
import CloseModalButton from '../CloseModalButton';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { showToast } from '../../utils/toast';
import { updateSingleDoc } from '../../utils/db';
import { fetchPlaceDetails } from '../../utils/googleMap';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { addActivityInItinerary } from '../../utils/formatData';

export default function AddNewItinerary({
  open,
  onClose,
  tripLandmarks,
  itineraryData,
  tripId,
  currentItineraryDate,
}) {
    const [adding, setAdding] = useState({name: '', isAdding: false, isSuccess: false});
  const [landmarks, setTripLandmarks] = useState([...tripLandmarks]);

  useEffect(() => {
    if (tripLandmarks.length > 0) {
      getLandmarks();
    }
  }, [itineraryData, tripLandmarks]);

  /**
   * This function is used to analyze the trip landmarks and the landmarks already in the itinerary
   * and update the trip landmarks state with the isOnList property.
   * The isOnList property is set to true if the landmark is already in the itinerary
   * and false otherwise.
   */
  const getLandmarks = () => {
    const existingLandmarksItinerary = itineraryData
      .map((itineraryDay) => {
        return itineraryDay.activities.map((activity) => {
          return activity.name;
        });
      })
      .flat();
    const analysisLandmarks = tripLandmarks.map((landmark) => {
      const isLandmarkInItinerary = existingLandmarksItinerary.includes(
        landmark.name
      );

      if (isLandmarkInItinerary) {
        return { ...landmark, isOnList: true };
      }

      return landmark;
    });

    setTripLandmarks(analysisLandmarks);
  };

  const handleAddPlace = async (place) => {
    setAdding({name: place.name, isAdding: true, isSuccess: false});
    try {
      const newPlace = await fetchPlaceDetails(place.place_id);

      const addedActivityData = {
        name: newPlace.name,
        image_url: "",
        geo_coordinates: newPlace.geometry.location,
        ticket_pricing: "Various",
        travel_time: "",
        opening_hours: newPlace?.opening_hours || {},
        best_time_to_visit: "",
        details: newPlace?.editorial_summary.overview || "",
        types: newPlace?.types || [],
      };

      const newItinerary = addActivityInItinerary(
        addedActivityData,
        itineraryData,
        currentItineraryDate
      );

      await updateSingleDoc('Trips', tripId, {'tripData.trip.itinerary': [...newItinerary]});

      setAdding({...adding, isAdding: false, isSuccess: true});
      setTimeout(() => {
        setAdding({...adding, isSuccess: false});
      }, 5000);
      onClose();
    } catch (error) {
      console.log("Error adding place: ", error);
      showToast("error", "There was an error", error);
      setAdding({...adding, isAdding: false, isSuccess: false});
    }
  };

  return (
    <View>
      <Modal visible={open} style={[modalStyles.container, { zIndex: 100 }]}>
        <SafeAreaView>
          <CloseModalButton onPress={onClose} />
        </SafeAreaView>

        <TextInput
          placeholder="Place"
          left={
            <TextInput.Icon
              icon={() => (
                <Entypo
                  name="location-pin"
                  size={20}
                  color={Colors.DARK_GREY}
                />
              )}
            />
          }
          value={""}
          style={{ marginTop: 10, backgroundColor: Colors.WHITE }}
        />

        <View style={{ gap: 30 }}>
          <Text
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 15,
              color: Colors.BLACK,
              marginVertical: 10,
            }}
          >
            Select from your landmarks
          </Text>

          {landmarks.length > 0 &&
            landmarks.map((landmark, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAddPlace(landmark)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    {adding.name === landmark.name && adding.isAdding ? (
                      <ActivityIndicator size="small" color={Colors.DARK_GREY} />
                    ) : adding.name === landmark.name && adding.isSuccess ? (
                      <FontAwesome name="check" size={15} color={Colors.DARK_GREY} />
                    ) : (
                      <FontAwesome
                        name="location-arrow"
                        size={15}
                        color={Colors.DARK_GREY}
                      />
                    )}
                    <View>
                      <Text style={{ fontFamily: "open-sans", fontSize: 15 }}>
                        {landmark.name}
                      </Text>
                      {landmark.isOnList && (
                        <Text
                          style={{
                            fontFamily: "open-sans-light",
                            fontSize: 12,
                            color: Colors.DARK_GREY,
                          }}
                        >
                          Already in itinerary
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </Modal>
    </View>
  );
}
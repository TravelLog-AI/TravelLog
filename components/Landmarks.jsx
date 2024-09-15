import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import { showToast } from '../utils/toast';
import axios from 'axios';
import { googlePlaceAPI } from '../constants/env';
import { FAB } from 'react-native-paper';
import { getPhoto } from '../utils/map';
import { updateSingleDoc } from '../utils/db';
import { arrayUnion } from 'firebase/firestore';

const Landmark = ({ place }) => {
  const photoLink = place?.photos
    ? getPhoto(place?.photos[0]?.photo_reference)
    : require('../assets/images/not_found.jpg');

  return (
    <View style={{ width: '100%', height: 200 }}>
      <Image
        source={{ uri: photoLink }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
          opacity: 0.8,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: Colors.WHITE,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'open-sans-bold',
            color: Colors.PRIMARY,
            fontSize: 15,
          }}
        >
          ⭐ {place.rating}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: Colors.LIGHT_BACKGROUND,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'open-sans-bold',
            fontSize: 20,
            color: Colors.LIGHT_BACKGROUND,
          }}
        >
          {place.name}
        </Text>
      </View>
    </View>
  );
};

const LandmarkToAdd = ({ place, handleAdd }) => {
  const photoLink = place?.photos
    ? getPhoto(place?.photos[0]?.photo_reference)
    : require('../assets/images/not_found.jpg');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginRight: 10,
        backgroundColor: Colors.LIGHT_BACKGROUND,
        alignSelf: 'flex-start',
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: photoLink }}
        style={{ width: 40, height: '100%', borderRadius: 10 }}
      />
      <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: 'open-sans-medium', fontSize: 15 }}>
          {place.name}
        </Text>
      </View>
      <View>
        <FAB
          icon="plus"
          size="small"
          color={Colors.PRIMARY}
          onPress={handleAdd}
          backgroundColor={Colors.LIGHT_PRIMARY}
        />
      </View>
    </View>
  );
};

export default function Landmarks({ tripData, coordinates, tripId }) {
  const [landmarkList, setLandmarkList] = useState([]);
  const [landmarksInItinerary, setLandmarksInItinerary] = useState([]);

  useEffect(() => {
    if (coordinates && landmarkList.length === 0) {
      fetchLandmarks();
    }
  }, [coordinates]);

  const fetchLandmarks = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates?.lat},${coordinates?.lng}&radius=5000&type=tourist_attraction&key=${googlePlaceAPI}`
      );
      setLandmarkList(response.data.results);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  };

  useEffect(() => {
    if (tripData && landmarkList.length > 0) {

      if (tripData?.landmarks && tripData?.landmarks?.length > 0) {
        setLandmarksInItinerary(tripData.landmarks);
        return;
      }

      const landmarkNames = [];
      tripData.itinerary.forEach((day) => {
        day.activities.forEach((activity) => {
          landmarkNames.push(activity.name);
        });
      });

      const landmarkExisted = landmarkList.filter((landmark) =>
        landmarkNames.includes(landmark.name)
      );

      setLandmarksInItinerary(landmarkExisted);
      handleAddLandmarks(landmarkExisted);
    }
  }, [tripData, landmarkList]);

  const handleAddLandmarks = async (landmarksToAdd) => {
    const formatLandmarks = landmarksToAdd.map((landmark) => {
      const {icon, icon_background_color, icon_mask_base_uri, plus_code, ...restOfData} = landmark;
      return {...restOfData};
    })
    try {
      await updateSingleDoc('Trips', tripId, {
        'tripData.trip.landmarks': arrayUnion(...formatLandmarks),
      });
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  };

  const handleAddLandmark = (landmark) => {
    handleAddLandmarks([landmark]);
  };

  return (
    <View style={{ flexDirection: 'column', gap: 15, marginTop: 20, marginBottom: 50 }}>
      {landmarksInItinerary.length > 0 &&
        landmarksInItinerary.map((landmark) => {
          return <Landmark key={landmark.name} place={landmark} />;
        })}

      <ScrollView horizontal>
        {landmarkList.length > 0 &&
          landmarkList.map((landmark, index) => {
            return (
              <LandmarkToAdd
                key={index}
                place={landmark}
                handleAdd={() => handleAddLandmark(landmark)}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

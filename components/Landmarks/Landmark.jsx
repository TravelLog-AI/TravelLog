import { View, Text, Animated, Image } from 'react-native'
import React, { useState } from 'react'
import useScale from '../../hooks/animations/useScale';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import PlaceDetails from '../PlaceDetails';
import { getPhoto } from '../../utils/map';
import { showToast } from '../../utils/toast';
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { updateSingleDoc } from '../../utils/db';

const Landmark = ({ place, placeList, tripId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { scaleValue, handlePressIn, handlePressOut } = useScale();

  const handleDelete = async () => {
    try {
        const listWithoutDeleted = placeList.filter(
          (placeInList) => placeInList.place_id !== place.place_id
        );

        await updateSingleDoc("Trips", tripId, {
          "tripData.trip.landmarks": [...listWithoutDeleted],
        });

        showToast("success", "Landmark deleted", '');
    } catch (error) {
        console.log('There was an error: ', error);
        showToast('error', 'There was an error', error);
    }
  };

  const photoLink = place?.photos
    ? getPhoto(place?.photos[0]?.photo_reference)
    : require("../../assets/images/not_found.jpg");

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
          height: '100%',
        //   marginVertical: 15,
          gap: 10,
          marginHorizontal: 10,
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
      renderRightActions={renderRightAction}
      style={{ flex: 1, width: "100%" }}
    >
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          borderRadius: 20,
          marginRight: 20,
          minWidth: "100%",
          // flexGrow: 1,
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={{
            width: "100%",
            // alignSelf: "flex-start",
            backgroundColor: Colors.LIGHT_BACKGROUND,
            height: "auto", // This allows the height to adjust to content
            borderRadius: 20,
            transform: [{ scale: scaleValue }],
          }}
        >
          <View style={{ width: "100%", height: 200 }}>
            <Image
              source={{ uri: photoLink }}
              style={{
                width: "100%",
                height: "100%",
                // borderRadius: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: isExpanded ? 0 : 20,
                borderBottomRightRadius: isExpanded ? 0 : 20,
                opacity: 0.8,
              }}
            />
            <View
              style={{
                position: "absolute",
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
                  fontFamily: "open-sans-bold",
                  color: Colors.PRIMARY,
                  fontSize: 15,
                }}
              >
                ⭐ {place.rating}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
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
                  fontFamily: "open-sans-bold",
                  fontSize: 20,
                  color: Colors.LIGHT_BACKGROUND,
                }}
              >
                {place.name}
              </Text>
            </View>
          </View>

          {/* <Text>{place.name}</Text> */}

          {/* Additional Place Details */}

          {isExpanded && (
            <View style={{ padding: 10 }}>
              <PlaceDetails place={place} />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default Landmark;
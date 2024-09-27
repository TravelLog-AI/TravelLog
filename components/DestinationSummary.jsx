import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '../constants/Colors';
import { GetPhotoRef } from '../utils/googleMap';
import { getPhoto } from "../utils/map";
import { useRouter } from 'expo-router';
import useScale from '../hooks/animations/useScale';
import { TouchableOpacity } from 'react-native';

const DestinationSummary = ({ location, style }) => {
  const [photoLink, setPhotoLink] = useState("");

  const router = useRouter();
  const { scaleValue, handlePressIn, handlePressOut } = useScale();

  useEffect(() => {
    generatePhotoURL();
  }, []);

  const generatePhotoURL = async () => {
    const photoRef = await GetPhotoRef(location);
    const photoURL = getPhoto(photoRef);

    setPhotoLink(photoURL);
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`search/${location}`)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          {
            width: 180,
            marginHorizontal: 20,
            transform: [{ scale: scaleValue }],
          },
          { ...style },
        ]}
      >
        <Image
          source={{
            uri: photoLink,
          }}
          style={{ width: "100%", height: 150, borderRadius: 20 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            margin: 10,
            gap: 10,
            paddingHorizontal: "5%",
            paddingRight: 50,
          }}
        >
          <EvilIcons name="location" size={20} color={Colors.WHITE} />
          <Text
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 15,
              color: Colors.WHITE,
              flexWrap: "wrap",
            }}
          >
            {location}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DestinationSummary;

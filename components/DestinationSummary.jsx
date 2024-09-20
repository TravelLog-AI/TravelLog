import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '../constants/Colors';
import { GetPhotoRef } from '../utils/googleMap';
import { getPhoto } from "../utils/map";

export default function ({location, style}) {
  const [photoLink, setPhotoLink] = useState('');

  useEffect(() => {
    generatePhotoURL();
  }, [])

  const generatePhotoURL = async () => {
      const photoRef = await GetPhotoRef(location);
      const photoURL = getPhoto(photoRef);

      setPhotoLink(photoURL)
  }

  return (
    <View style={[{ width: 180, marginHorizontal: 20 }, {...style}]}>
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
          paddingHorizontal: '5%',
          paddingRight: 50,
        }}
      >
        <EvilIcons name="location" size={20} color={Colors.WHITE} />
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 15,
            color: Colors.WHITE,
            flexWrap: 'wrap'
          }}
        >
          {location}
        </Text>
      </View>
    </View>
  );
}
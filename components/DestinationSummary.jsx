import { View, Text, Image } from 'react-native'
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '../constants/Colors';

export default function 
() {
  return (
    <View style={{ width: 180, marginHorizontal: 20, }}>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AXCi2Q7xYJbuuY48mFAqxHuLlvhjDA3uFAPVZ-1-f0Nhj1apm3Wjmy2DO62XzBw9skTf4Vwbk8U_37z-NJsuPrKbwpzVpJud6UKm5lN_fcxpFenxPvT5Umwrk__XyqeLB_72tl4t6zr685xv3DF-xB5ggz9SFo5ipEIdBQib6bnJpDffU-3a&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{ width: "100%", height: 150, borderRadius: 20 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignItems: 'center',
          margin: 10,
          gap: 10,
        }}
      >
        <EvilIcons name="location" size={20} color={Colors.WHITE} />
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 18,
            color: Colors.WHITE,
          }}
        >
          New York City
        </Text>
      </View>
    </View>
  );
}
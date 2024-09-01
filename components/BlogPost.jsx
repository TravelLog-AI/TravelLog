import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Colors } from '../constants/Colors'

export default function BlogPost() {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Avatar.Text size={30} label="B" />

      <View>
        {/* User & Post Info */}
        <View>
          <Text style={{ fontFamily: "open-sans-bold", fontSize: 15 }}>
            Bin Mai
          </Text>
          <Text
            style={{
              fontFamily: "open-sans",
              fontSize: 15,
              color: Colors.DARK_GREY,
            }}
          >
            15 Jul 2024
          </Text>
        </View>

        {/* Post Heading */}
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
            marginVertical: 10,
          }}
        >
          7 Days In Victoria, BC. What an unforgettable memory.
        </Text>
        <Text style={{ fontFamily: "open-sans", fontSize: 15 }}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Text>
        <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AXCi2Q7xYJbuuY48mFAqxHuLlvhjDA3uFAPVZ-1-f0Nhj1apm3Wjmy2DO62XzBw9skTf4Vwbk8U_37z-NJsuPrKbwpzVpJud6UKm5lN_fcxpFenxPvT5Umwrk__XyqeLB_72tl4t6zr685xv3DF-xB5ggz9SFo5ipEIdBQib6bnJpDffU-3a&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{ width: "100%", height: 200, borderRadius: 20, marginTop: 20 }}
      />
      </View>
    </View>
  );
}
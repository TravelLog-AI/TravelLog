import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import { Avatar } from 'react-native-paper';

export default function BlogSummary() {
  return (
    <View style={{ width: 250, marginHorizontal: 20, gap: 5 }}>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AXCi2Q7xYJbuuY48mFAqxHuLlvhjDA3uFAPVZ-1-f0Nhj1apm3Wjmy2DO62XzBw9skTf4Vwbk8U_37z-NJsuPrKbwpzVpJud6UKm5lN_fcxpFenxPvT5Umwrk__XyqeLB_72tl4t6zr685xv3DF-xB5ggz9SFo5ipEIdBQib6bnJpDffU-3a&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{ width: "100%", height: 150, borderRadius: 20 }}
      />
      <Text style={{ fontFamily: "open-sans", fontSize: 18 }}>
        Live like a local in Victoria, BC
      </Text>
      <Text
        style={{
          fontFamily: "open-sans",
          fontSize: 15,
          color: Colors.DARK_GREY,
        }}
      >
        I have lived in the Seattle area for my entire life! This guyide does...
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 10, }}>
        <Avatar.Text size={20} label={"Bi"} />
        <Text style={{ fontFamily: "open-sans", color: Colors.DARK_GREY }}>
          Bin Mai · 53 views
        </Text>
      </View>
    </View>
  );
}
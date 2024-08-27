import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Colors } from '../constants/Colors'

export default function BlogPost() {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Avatar.Text size={30} label="BM" />

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
      </View>
    </View>
  );
}
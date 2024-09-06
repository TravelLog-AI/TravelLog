import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

export default function NotFound({text}) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <MaterialIcons name="error-outline" size={24} color={Colors.DARK_GREY} />
      <Text
        style={{
          fontFamily: "open-sans-medium",
          fontSize: 15,
          textAlign: "center",
          color: Colors.DARK_GREY,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
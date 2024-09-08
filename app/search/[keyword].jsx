import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function SearchResult() {
    const { keyword } = useLocalSearchParams();

    console.log(keyword, 'keyword');

  return (
    <View>
      <Text>SearchResult</Text>
    </View>
  )
}
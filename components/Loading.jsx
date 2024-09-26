import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function Loading() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  )
}
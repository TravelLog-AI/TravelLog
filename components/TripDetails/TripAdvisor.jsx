import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { tripDetailsStyle } from '../../app/trip/style'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import NotFound from '../NotFound';

export default function TripAdvisor() {
  return (
    <ScrollView>
      <Text style={tripDetailsStyle.heading}>Advisor</Text>
      <NotFound text='There is no advisor currently' />
      {/* <View style={{margin: 20, marginRight: 40, gap: 20}}>
        <BlogPost />
        <BlogPost />
      </View> */}
    </ScrollView>
  );
}
import { View, Text, Touchable } from 'react-native'
import React, { Fragment } from 'react'
import TripSummary from '../TripSummary'
import { Colors } from '../../constants/Colors';
import { Divider } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PrimaryButton from '../Primary/Button';
import { useRouter } from 'expo-router';

export default function MyTrips({trips}) {

    const router = useRouter();

  console.log(trips, 'trips');
  return (
    <View style={{ gap: 20 }}>
      {trips && trips.length > 0 ? (
        trips.map((trip, index) => {
            return (
              <Fragment key={index}>
                <TripSummary trip={trip} />
                <Divider />
              </Fragment>
            );
        })
      ) : (
        <View style={{ gap: 10 }}>
          <MaterialIcons name="error-outline" size={24} color="black" />
          <Text
            style={{
              fontFamily: "open-sans",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Looks like you haven't created a trip with us yet.
          </Text>
          <PrimaryButton labelStyle={{fontSize: 15}} style={{padding: 10}}>
            Create Trip
          </PrimaryButton>
        </View>
      )}
    </View>
  );
}
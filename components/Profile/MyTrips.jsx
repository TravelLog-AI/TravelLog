import { View } from 'react-native'
import React, { Fragment } from 'react'
import TripSummary from '../TripSummary'
import { Divider } from 'react-native-paper';
import PrimaryButton from '../Primary/Button';
import NotFound from '../NotFound';

export default function MyTrips({trips, isOwner}) {

  return (
    <View style={{ gap: 20 }}>
      {trips && trips.length > 0 ? (
        trips.map((trip, index) => {
          return (
            <Fragment key={index}>
              <TripSummary trip={trip} isOwner={isOwner} />
              <Divider />
            </Fragment>
          );
        })
      ) : (
        <View style={{ gap: 10 }}>
          <NotFound text="Looks like you haven't created a trip with us yet." />
          <PrimaryButton labelStyle={{ fontSize: 15 }} style={{ padding: 10 }}>
            Create Trip
          </PrimaryButton>
        </View>
      )}
    </View>
  );
}
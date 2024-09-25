import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { tripDetailsStyle } from "../../app/trip/style";
import { Colors } from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../Primary/Button";
import NotFound from "../NotFound";
import { overviewSubTabs } from "../../constants/arrays";
import Landmarks from "../Landmarks";
import HotelList from "../HotelList";

export const TripOverviewContent = ({tripData}) => {
  return (
    <>
      <Text
        style={[
          tripDetailsStyle.heading,
          { color: Colors.BLACK, marginTop: 10 },
        ]}
      >
        {tripData?.destination}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome5 name="calendar-alt" size={10} color="grey" />
          <Text style={tripDetailsStyle.subtitle}>
            {tripData?.start_date} - {tripData?.end_date}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome5 name="users" size={10} color="grey" />
          <Text style={tripDetailsStyle.subtitle}>
            {tripData?.traveler_count} people
          </Text>
        </View>
      </View>
    </>
  );
}

export default function TripOverview({tripData, coordinates, tripId, isOwner}) {
  const [currentTab, setCurrentTab] = useState('Flights');
  
  return (
    <View>
      <Text style={tripDetailsStyle.heading}>Overview</Text>
      <TripOverviewContent tripData={tripData} />

      {/* Overview sub tabs */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 20,
          gap: 5,
        }}
      >
        {isOwner ? (
          overviewSubTabs.map((tab, index) => {
            let icon;
            if (currentTab === tab.name) {
              icon = overviewSubTabs[index].getIcon(Colors.WHITE);
            } else {
              icon = overviewSubTabs[index].getIcon(Colors.PRIMARY);
            }

            return (
              <PrimaryButton
                key={index}
                labelStyle={{
                  fontSize: 15,
                  color:
                    currentTab === tab.name ? Colors.WHITE : Colors.PRIMARY,
                  textAlign: "center",
                }}
                style={{
                  width: 110,
                  textAlign: "center",
                  padding: 10,
                  borderWidth: 2,
                  borderColor: Colors.PRIMARY,
                  backgroundColor:
                    currentTab === tab.name ? Colors.PRIMARY : Colors.WHITE,
                }}
                onPress={() => setCurrentTab(tab.name)}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {icon}
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "open-sans-medium",
                      fontSize: 15,
                      color:
                        currentTab === tab.name ? Colors.WHITE : Colors.PRIMARY,
                    }}
                  >
                    {tab.name}
                  </Text>
                </View>
              </PrimaryButton>
            );
          })
        ) : (
          <View style={{marginTop: 10, width: '100%'}}>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 20,
                color: Colors.PRIMARY,
              }}
            >
              Landmarks
            </Text>
            <Landmarks
              tripData={tripData}
              coordinates={coordinates}
              tripId={tripId}
              isOwner={isOwner}
            />
          </View>
        )}
      </View>

      {/* Tab Content */}
      {isOwner && (
        <View style={{ paddingHorizontal: 20 }}>
          {currentTab === "Hotels" ? (
            <HotelList tripData={tripData} currentTab={currentTab} />
          ) : currentTab === "Landmarks" ? (
            <Landmarks
              tripData={tripData}
              coordinates={coordinates}
              tripId={tripId}
              isOwner={isOwner}
            />
          ) : (
            <NotFound text="Coming Soon" />
          )}
        </View>
      )}
    </View>
  );
}

import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { tripDetailsStyle } from "../../app/trip/style";
import { Colors } from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../Primary/Button";
import { showToast } from "../../utils/toast";
import axios from "axios";
import { YYYYMMDDFormat } from "../../utils/date";
import Hotel from "../Hotel";
import { Divider } from "react-native-paper";
import NotFound from "../NotFound";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { overviewSubTabs } from "../../constants/arrays";


const serpAPIKey = process.env.EXPO_PUBLIC_SERP_API_KEY;

const tabs = ['Flights', 'Hotels', 'Landmarks']
export default function TripOverview({tripData}) {
  const [currentTab, setCurrentTab] = useState('Flights');
  const [hotelList, setHotelList] = useState([]);
  const [flightList, setFlightList] = useState([]);
  
  useEffect(() => {
    if (tripData && currentTab === 'Hotels' && hotelList.length === 0) {
      fetchHotels();
    }
  }, [tripData, currentTab])

  const fetchHotels = async () => {
    try {
      const formattedStartDate = YYYYMMDDFormat(tripData.start_date);
      const formattedEndDate = YYYYMMDDFormat(tripData.end_date);
      
      const googleHotelsParams = {
        api_key: serpAPIKey,
        engine: "google_hotels",
        q: `${tripData.destination} Hotels`,
        check_in_date: formattedStartDate,
        check_out_date: formattedEndDate,
        adults: tripData.traveler_count,
        currency: "CAD",
      };

      const response = await axios.get('https://serpapi.com/search.json', {
        params: googleHotelsParams,
      });

      setHotelList(response.data.properties);
      console.log(response.data.properties);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  }

  return (
    <ScrollView>
      <Text style={tripDetailsStyle.heading}>Overview</Text>
      <Text
        style={[
          tripDetailsStyle.heading,
          { color: Colors.BLACK, marginTop: 10 },
        ]}
      >
        {tripData.destination}
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
            {tripData.start_date} - {tripData.end_date}
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
            {tripData.traveler_count} people
          </Text>
        </View>
      </View>

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
        {overviewSubTabs.map((tab, index) => {
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
                color: currentTab === tab.name ? Colors.WHITE : Colors.PRIMARY,
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
        })}
      </View>

      {/* Tab Content */}
      <View style={{ paddingHorizontal: 20 }}>
        {currentTab === "Hotels" ? (
          hotelList.length > 0 &&
          hotelList.map((hotel, index) => {
            return (
              <View
                key={index}
                style={{ marginVertical: 20, flexDirection: "column", gap: 10 }}
              >
                <Hotel hotel={hotel} />
                <Divider />
              </View>
            );
          })
        ) : (
          <NotFound text="Coming Soon" />
        )}
      </View>
    </ScrollView>
  );
}

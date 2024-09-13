import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { YYYYMMDDFormat } from '../utils/date';
import { serpAPIKey } from '../constants/env';
import { showToast } from '../utils/toast';
import Hotel from './Hotel';
import { Divider } from 'react-native-paper';
import axios from 'axios';


export default function HotelList({ tripData, currentTab }) {
    const [hotelList, setHotelList] = useState([]);
    
  useEffect(() => {
    if (tripData && currentTab === "Hotels" && hotelList.length === 0) {
      fetchHotels();
    }
  }, [tripData, currentTab]);

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

      const response = await axios.get("https://serpapi.com/search.json", {
        params: googleHotelsParams,
      });

      setHotelList(response.data.properties);
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };
  return (
    <>
{      hotelList.length > 0 &&
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
          })}
    </>

  );
}
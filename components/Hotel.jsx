import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { minifyNumber } from '../utils/number';

export default function Hotel({hotel}) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: hotel.images[0].original_image
          }}
          style={{ width: "100%", height: 100, borderRadius: 10 }}
        />
      </View>

      {/* Hotel Info */}
      <View style={{ flex: 3, flexDirection: "column", gap: 10 }}>
        <View style={{gap: 5}}>
            <Text style={{ fontFamily: "open-sans-medium", fontSize: 18 }}>
            {hotel.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
            {hotel?.extracted_hotel_class > 4 && (
                <Text
                style={{
                    fontFamily: "open-sans",
                    fontSize: 15,
                    color: Colors.DARK_GREY,
                }}
                >
                • {hotel.hotel_class}
                </Text>
            )}
            {hotel?.amenities &&
                hotel.amenities.slice(0, hotel?.extracted_hotel_class > 4 ? 2 : 3).map((amenity, index) => {
                return (
                    <Text
                    key={index}
                    style={{
                        fontFamily: "open-sans",
                        fontSize: 12,
                        color: Colors.DARK_GREY,
                    }}
                    >
                    • {amenity}
                    </Text>
                );
                })}
            </View>
        </View>

        {/* Rating & Price */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
            <AntDesign
              name="staro"
              size={20}
              color={Colors.PRIMARY} 
            />
            <Text style={{ fontFamily: "open-sans", fontSize: 15, color: Colors.PRIMARY }}>
              {hotel.overall_rating} 
            </Text>
            <Text style={{ fontFamily: "open-sans", fontSize: 15, color: Colors.DARK_GREY }}>({minifyNumber(hotel.reviews)})</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 20,
                color: Colors.PRIMARY,
              }}
            >
              {hotel?.rate_per_night?.before_taxes_fees}/
            </Text>
            <Text
              style={{
                fontFamily: "open-sans",
                fontSize: 15,
                color: Colors.DARK_GREY,
              }}
            >
              night
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
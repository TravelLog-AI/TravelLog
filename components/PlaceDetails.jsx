import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { days } from "../constants/arrays";
import { TouchableOpacity } from "react-native";

export default function PlaceDetails({ place }) {
  const [isExpandHours, setIsExpandHours] = useState(false);

  const openingHours = useMemo(() => {
    return place?.opening_hours?.weekday_text || [];
  }, [place]);

  const todayIndex = new Date().getDay();
  const today = days[todayIndex];
  const todayHours = openingHours.find((hour) => hour.split(":")[0] === today);
  
  return (
    <View style={{gap: 10}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <FontAwesome name="book" size={12} color={Colors.DARK_GREY} />
        <Text
          style={{
            fontFamily: "open-sans-medium",
            fontSize: 12,
            color: Colors.DARK_GREY,
          }}
        >
          {place?.details}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: isExpandHours ? "flex-start" : "center",
        }}
      >
        <AntDesign name="clockcircle" size={12} color={Colors.DARK_GREY} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          {openingHours.length > 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "flex-start",
              }}
            >
              {isExpandHours ? (
                openingHours.map((day, index) => (
                  <Text
                    key={index}
                    style={{
                      fontFamily: "open-sans-medium",
                      fontSize: 12,
                      color: Colors.DARK_GREY,
                    }}
                  >
                    {day}
                  </Text>
                ))
              ) : (
                <Text
                  style={{
                    fontFamily: "open-sans-medium",
                    fontSize: 12,
                    color: Colors.DARK_GREY,
                  }}
                >
                  {todayHours}
                </Text>
              )}
            </View>
          ) : place?.best_time_to_visit ? (
            <Text
              style={{
                fontFamily: "open-sans-medium",
                fontSize: 12,
                color: Colors.DARK_GREY,
              }}
            >
              {place?.best_time_to_visit}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "open-sans-medium",
                fontSize: 12,
                color: Colors.DARK_GREY,
              }}
            >
              Check online for more details
            </Text>
          )}
          {openingHours.length > 0 && (
            <TouchableOpacity onPress={() => setIsExpandHours(!isExpandHours)}>
              <AntDesign
                name={isExpandHours ? "caretup" : "caretdown"}
                size={12}
                color={Colors.DARK_GREY}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {place?.ticket_pricing && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Entypo name="ticket" size={12} color={Colors.DARK_GREY} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 12,
              color: Colors.DARK_GREY,
            }}
          >
            {place?.ticket_pricing}
          </Text>
        </View>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <MaterialIcons name="category" size={12} color={Colors.DARK_GREY} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {place?.types && place.types.length > 0 ? (
            place.types.map((type, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    fontFamily: "open-sans-medium",
                    fontSize: 12,
                    color: Colors.DARK_GREY,
                  }}
                >
                  {type},
                </Text>
              );
            })
          ) : (
            <Text
              style={{
                fontFamily: "open-sans-medium",
                fontSize: 12,
                color: Colors.DARK_GREY,
              }}
            >
              Unknown
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

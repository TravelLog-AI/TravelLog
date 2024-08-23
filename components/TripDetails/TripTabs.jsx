import React, { useState } from "react";
import PrimaryButton from "../Primary/Button";
import { View } from "react-native";
import { tripOverviewStyle } from "../../app/trip/style";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { tripDetailTabs } from "../../constants/arrays";

export default function TripTabs({currentTab, setCurrentTab}) {
  // const [currentTab, setCurrentTab] = useState("Overview");
  return (
    <View style={tripOverviewStyle.tabButtonContainer}>
      {tripDetailTabs.map((tripTab, index) => {
        let icon;
        if (currentTab === tripTab.name) {
          icon = tripDetailTabs[index].getIcon(Colors.WHITE);
        } else {
          icon = tripDetailTabs[index].getIcon(Colors.PRIMARY);
        }

        return (
          <PrimaryButton
            key={tripTab.id}
            style={{
              width: 60,
              borderRadius: 10,
              backgroundColor:
                currentTab === tripTab.name ? Colors.PRIMARY : Colors.WHITE,
              shadowColor: "rgba(100, 100, 111, 1)",
              shadowOffset: { width: 0, height: 7 },
              shadowOpacity: 0.2,
              shadowRadius: 29 / 2,
              elevation: 7,
            }}
            onPress={() => setCurrentTab(tripTab.name)}
          >
            {icon}
          </PrimaryButton>
        );
      })}
    </View>
  );
}

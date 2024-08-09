import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { primaryStyles } from "../../styles/primary";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectPlace from "../Modals/Create/SelectPlace";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Chip, TextInput } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import SelectDate from "../Modals/Create/SelectDate";
import AutocompleteInput from "react-native-autocomplete-input";
import PrimaryButton from "../Primary/Button";
import SelectTravelers from "../Modals/Create/SelectTravelers";
import { createStyles } from "./styles";

export default function CreateTrip() {
  const [address, setAddress] = useState();
  const [isSelectPlaceOpen, setIsSelectPlaceOpen] = useState(false);
  const [isSelectDateOpen, setIsSelectDateOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <SelectDate
        open={isSelectDateOpen}
        onClose={() => setIsSelectDateOpen(false)}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <SelectPlace
        open={isSelectPlaceOpen}
        onClose={() => setIsSelectPlaceOpen(false)}
        setAddress={setAddress}
      />
      <Text style={[primaryStyles.heading, createStyles.heading]}>
        Let's Plan Your New Trip ✍🏻
      </Text>
      <Text style={[primaryStyles.subtitle, createStyles.subtitle]}>
        Create Your New Trip Effortlessly With The Power Of AI
      </Text>

      {/* Destination */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Destination 🗺️
      </Text>
      <TextInput
        placeholder="Where"
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome6 name="map-location-dot" size={20} color="black" />
            )}
          />
        }
        onPress={() => setIsSelectPlaceOpen(true)}
        value={address?.name || ""}
        style={{ marginTop: 10, backgroundColor: Colors.PRIMARY_BACKGROUND }}
      />

      {/* When */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        When 📅
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="From"
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome6 name="calendar-days" size={20} color="black" />
              )}
            />
          }
          style={{
            width: "49%",
            fontSize: 15,
            backgroundColor: Colors.PRIMARY_BACKGROUND,
          }}
          value={moment(startDate)?.format("MMM DD, YYYY") || ""}
          onPress={() => setIsSelectDateOpen(true)}
        />
        <TextInput
          placeholder="To"
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome6 name="calendar-days" size={20} color="black" />
              )}
            />
          }
          style={{
            width: "49%",
            fontSize: 15,
            backgroundColor: Colors.PRIMARY_BACKGROUND,
          }}
          value={moment(endDate)?.format("MMM DD, YYYY") || ""}
          onPress={() => setIsSelectDateOpen(true)}
        />
      </View>

      {/* Number of Travelers */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Number of Travelers 🧳
      </Text>
      <SelectTravelers numberOfTravelers={numberOfTravelers} setNumberOfTravelers={setNumberOfTravelers} />

      {/* Buttons Group */}
      <View display="flex" flexDirection="row" justifyContent="space-around" marginTop={30}>
        <PrimaryButton style={{ width: "49%", padding: 10 }} variant="outlined">
          Create Trip
        </PrimaryButton>
        <PrimaryButton style={{ width: "49%", padding: 10 }} badgeContent="AI Powered 🤖">Generate Trip</PrimaryButton>
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   heading: {
//     color: Colors.BLACK,
//     textAlign: "left",
//     fontSize: 25,
//   },
//   subtitle: {
//     color: Colors.DARK_GREY,
//     textAlign: "left",
//     fontSize: 15,
//   },
//   sectionHeading: {
//     color: Colors.BLACK,
//     textAlign: "left",
//     fontSize: 20,
//     marginTop: 30,
//   },
// });

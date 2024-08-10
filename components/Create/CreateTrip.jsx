import { View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { primaryStyles } from "../../styles/primary";
import { Colors } from "../../constants/Colors";
import SelectPlace from "../Modals/Create/SelectPlace";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TextInput } from "react-native-paper";
import moment from "moment";
import SelectDate from "../Modals/Create/SelectDate";
import PrimaryButton from "../Primary/Button";
import SelectTravelers from "../Modals/Create/SelectTravelers";
import { createStyles } from "./styles";
import SelectBudget from "../Modals/Create/SelectBudget";
import { useRouter } from "expo-router";
import { showToast } from "../../utils/toast";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function CreateTrip({ onClose }) {
  const [address, setAddress] = useState();
  const [isSelectPlaceOpen, setIsSelectPlaceOpen] = useState(false);
  const [isSelectDateOpen, setIsSelectDateOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [selectedBudget, setSelectedBudget] = useState("Cheap");

  const router = useRouter();
  const  { setTripData} = useContext(CreateTripContext);

  const moveToGenerateAIPage = () => {
    if (!address || !startDate || !endDate) {
      showToast("error", "Please fill out all information needed", "");
      return;
    }

    setTripData({
      address,
      startDate,
      endDate,
      numberOfTravelers,
      selectedBudget
    });
    router.push('generateAITrip/');
    onClose();
  };

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
      <SelectTravelers
        numberOfTravelers={numberOfTravelers}
        setNumberOfTravelers={setNumberOfTravelers}
      />

      {/* Budget */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Your Budget 💲
      </Text>
      <SelectBudget
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />

      {/* Buttons Group */}
      <View
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        marginTop={30}
      >
        <PrimaryButton
          style={{ width: "49%", padding: 10 }}
          variant="outlined"
          disabled={!address || !startDate || !endDate}
        >
          Create Trip
        </PrimaryButton>
        <PrimaryButton
          onPress={moveToGenerateAIPage}
          style={{ width: "49%", padding: 10 }}
          badgeContent="AI Powered 🤖"
          disabled={!address || !startDate || !endDate}
        >
          Generate Trip
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

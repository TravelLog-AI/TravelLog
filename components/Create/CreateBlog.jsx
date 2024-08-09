import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import SelectPlace from "../Modals/Create/SelectPlace";
import { primaryStyles } from "../../styles/primary";
import { createStyles } from "./styles";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";

export default function CreateBlog() {
  const [address, setAddress] = useState();
  const [isSelectPlaceOpen, setIsSelectPlaceOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ScrollView>
      <SelectPlace
        open={isSelectPlaceOpen}
        onClose={() => setIsSelectPlaceOpen(false)}
        setAddress={setAddress}
      />
      <Text style={[primaryStyles.heading, createStyles.heading]}>
        Let's Share Your Experience ✍🏻
      </Text>
      <Text style={[primaryStyles.subtitle, createStyles.subtitle]}>
        Connecting through stories and building stronger communities together
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
        style={createStyles.textInput}
      />

      {/* Title */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Title
      </Text>
      <TextInput
        placeholder="Write your title..."
        left={
          <TextInput.Icon
            icon={() => <MaterialIcons name="title" size={20} color="black" />}
          />
        }
        value={title}
        onChange={(text) => setTitle(text)}
        style={createStyles.textInput}
      />

      {/* Description */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Description
      </Text>
      <TextInput
        placeholder="Write your title..."
        left={
          <TextInput.Icon
            icon={() => <FontAwesome name="pencil" size={20} color="black" />}
          />
        }
        value={title}
        onChange={(text) => setDescription(text)}
        style={createStyles.textInput}
      />

      {/* Your Trip */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Your Trip
      </Text>
      <Text>* Select your Trip will go here *</Text>
    </ScrollView>
  );
}

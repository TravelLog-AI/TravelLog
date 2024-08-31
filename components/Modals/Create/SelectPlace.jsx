import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import PrimaryButton from "../../Primary/Button";
import { createStyles } from "../../Create/styles";
import { modalStyles } from "../styles";

export default function SelectPlace({ open, onClose, setAddress }) {
  return (
    <View>
      <Modal
        keyboardShouldPersistTaps="always"
        isVisible={open}
        style={[createStyles.container]}
      >
        <View style={modalStyles.closeButtonContainer}>
          <PrimaryButton
            onPress={onClose}
            style={{ backgroundColor: Colors.WHITE, borderRadius: "50%" }}
          >
            <Entypo name="cross" size={40} color={Colors.GREY} />
          </PrimaryButton>
        </View>
        <View style={{ height: "100%", zIndex: 2100 }}>
          <GooglePlacesAutocomplete
            keyboardShouldPersistTaps={"always"}
            placeholder="Enter city"
            fetchDetails
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              language: "en",
              types: "(cities)",
            }}
            styles={{
              textInputContainer: {
                backgroundColor: "grey",
                borderWidth: 1,
                zIndex: 100,
              },
              textInput: {
                height: 38,
                fontSize: 16,
                borderWidth: 1,
                color: Colors.BLACK,
              },
              predefinedPlacesDescription: {
                color: Colors.LIGHT_PRIMARY,
              },
            }}
            onPress={(data, details = null) => {
              if (details) {
                setAddress({
                  name: data.description,
                  coordinates: details.geometry.location,
                });
                onClose();
              } else {
                console.error("Failed to fetch details");
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

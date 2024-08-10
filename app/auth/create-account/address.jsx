import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../../../components/Primary/Button";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { authStyles } from "../styles";
import { createAccountStyles } from "./styles";
import { fetchDoc } from "../../../utils/db";
import { updateDoc } from "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Address() {
  const { userDocId } = useLocalSearchParams();

  const router = useRouter();

  const handleUpdateUserAddress = async (userAddress) => {
    try {
      const userDoc = await fetchDoc("Users", userDocId);
      await updateDoc(userDoc.docRef, { address: userAddress });

      router.push("auth/create-account/success");
    } catch (error) {
      console.log("Something Went Wrong: ", error);
    }
  };

  return (
    <View style={createAccountStyles.screenContainer}>
      <View style={createAccountStyles.headingContainer}>
        <Text style={[primaryStyles.heading, { textAlign: "left" }]}>
          Last Step !
        </Text>
      </View>
      <Text style={[createAccountStyles.emoji, {marginTop: '50%'}]}>🧑‍💻</Text>
      <Text style={createAccountStyles.inputLabel}>
        Your address helps us assist you better
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Search Place..."
        fetchDetails
        onPress={async (data, details = null) => {
          await handleUpdateUserAddress({
            name: data.description,
            coordinates: details.geometry.location,
          });
          router.push('auth/create-account/success');
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: "5%",
          },
        }}
      />
      {/* <PrimaryButton
        onPress={handleUpdateUserAddress}
        mode="contained"
        // style={{ marginTop: "5%" }}
      >
        Finish
      </PrimaryButton> */}
    </View>
  );
}

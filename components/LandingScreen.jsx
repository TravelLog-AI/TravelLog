import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { landingScreenStyles } from "../styles/landingScreen";
import { primaryStyles } from "../styles/primary";
import { useRouter } from "expo-router";
import PrimaryButton from "./Primary/Button";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("./../assets/images/landingImg.jpg")}
        style={{ width: "100%", flex: 6 }}
      />
      <View style={landingScreenStyles.container}>
        <Text style={primaryStyles.heading}>Travel Log</Text>
        <Text style={primaryStyles.helperText}>
          Travel Log - Your AI travel planner! Get personalized itineraries and
          top recommendations for a hassle-free travel experience. Explore with
          ease!
        </Text>
        <PrimaryButton
          mode="contained"
          onPress={() => router.push("auth/sign-in")}
          style={{ marginTop: "20%" }}
        >
          Get Started
        </PrimaryButton>
      </View>
    </View>
  );
}

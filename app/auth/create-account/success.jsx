import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createAccountStyles } from "./styles";
import { Colors } from "../../../constants/Colors";
import ConfettiCannon from 'react-native-confetti-cannon';
import PrimaryButton from "../../../components/Primary/Button";
import { useRouter } from "expo-router";

export default function SuccessfulPage() {
  const router = useRouter();

  return (
    <View style={[createAccountStyles.screenContainer, {gap: 8}]}>
      <ConfettiCannon count={250} origin={{x: -10, y: 0}} fallSpeed={2500} fadeOut/>
      <Ionicons name="checkmark-circle" size={70} color={Colors.PRIMARY} style={{textAlign: 'center'}} />
      <Text style={[createAccountStyles.message, {textAlign: 'center', fontFamily: 'open-sans-bold'}]}>
        ALL SET
      </Text>
      <Text style={[createAccountStyles.message, {textAlign: 'center'}]}>
        Now Let's Create Your First Trip
      </Text>
      <PrimaryButton mode="contained" style={{marginTop: '10%'}} onPress={() => router.push('(tabs)/mytrip')} >
        Go to home page
      </PrimaryButton>
    </View>
  );
}

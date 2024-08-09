import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createAccountStyles } from "./styles";
import { Colors } from "../../../constants/Colors";
import ConfettiCannon from 'react-native-confetti-cannon';
import PrimaryButton from "../../../components/Primary/Button";
import { useRouter } from "expo-router";

export default function SuccessfulPage() {
  const router = useRouter();

  // Animated Values
  const iconScale = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Icon scale-up animation
    Animated.spring(iconScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Fade-in animations for messages and button. staggered
    Animated.stagger(300, [
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }) ,
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start()
  }, [])

  return (
    <View style={[createAccountStyles.screenContainer, {gap: 8}]}>
      <ConfettiCannon count={250} origin={{x: -10, y: 0}} fallSpeed={2500} fadeOut/>
      <Animated.View style={{transform: [{scale: iconScale}]}}>
        <Ionicons name="checkmark-circle" size={70} color={Colors.PRIMARY} style={{textAlign: 'center'}} />
      </Animated.View>
      <Animated.Text style={[createAccountStyles.message, {textAlign: 'center', fontFamily: 'open-sans-bold', opacity: messageOpacity}]}>
        ALL SET
      </Animated.Text>
      <Animated.Text style={[createAccountStyles.message, {textAlign: 'center', opacity: messageOpacity}]}>
        Now Let's Create Your First Trip
      </Animated.Text>
      <Animated.View style={{opacity: buttonOpacity}}>
        <PrimaryButton mode="contained" style={{marginTop: '10%'}} onPress={() => router.replace('(tabs)/home')} >
          Go to home page
        </PrimaryButton>
      </Animated.View>
    </View>
  );
}

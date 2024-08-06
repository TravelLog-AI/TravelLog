import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../../../components/Primary/Button";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { authStyles } from "../styles";
import { createAccountStyles } from "./styles";

export default function Address() {
    const [userAddress, setUserAddress] = useState("");
    
    const router = useRouter();

  return (
    <View
      style={{
        padding: 25,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={createAccountStyles.headingContainer}>
        <Text style={[primaryStyles.heading, { textAlign: "left" }]}>
          Last Step !
        </Text>
      </View>
      <Text style={createAccountStyles.emoji}>🧑‍💻</Text>
      <View style={[authStyles.inputContainer, { marginTop: 20 }]}>
        <Text
          style={createAccountStyles.inputLabel}
        >
          Your address helps us assist you better
        </Text>
        <TextInput
          label="Your Address"
          value={userAddress}
          onChangeText={(text) => setUserAddress(text)}
          mode="outlined"
        />
      </View>
      <PrimaryButton
        onPress={() => router.push("/(tabs)/mytrip")}
        mode="contained"
        style={{ marginTop: 20 }}
      >
        Finish
      </PrimaryButton>
    </View>
  );
}

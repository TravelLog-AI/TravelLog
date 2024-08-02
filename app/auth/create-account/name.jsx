import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { authStyles } from "../styles";
import PrimaryButton from "../../../components/Primary/Button";
import { TextInput } from "react-native-paper";
import { Colors } from "../../../constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { createAccountStyles } from "./styles";

export default function Name() {
  const [userName, setUserName] = useState("");
  
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
          Almost Done !
        </Text>
      </View>
      <Text style={createAccountStyles.emoji}>🧑‍💻</Text>
      <View style={[authStyles.inputContainer, { marginTop: 20 }]}>
        <Text
          style={createAccountStyles.inputLabel}
        >
          How'd You Like To Be Called ?
        </Text>
        <TextInput
          label="Your Name"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          mode="outlined"
        />
      </View>
      <PrimaryButton
        onPress={() => router.push("auth/create-account/address")}
        mode="contained"
        style={{ marginTop: 20 }}
      >
        Continue
      </PrimaryButton>
    </View>
  );
}

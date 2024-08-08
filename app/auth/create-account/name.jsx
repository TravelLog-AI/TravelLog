import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { authStyles } from "../styles";
import PrimaryButton from "../../../components/Primary/Button";
import { TextInput } from "react-native-paper";
import { Colors } from "../../../constants/Colors";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { createAccountStyles } from "./styles";
import { showToast } from "../../../utils/toast";
import { updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase.config";
import { fetchDoc } from "../../../utils/db";

export default function Name() {
  const { userDocId } = useLocalSearchParams();
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleUpdateUserName = async () => {
    if (userName.trim() === "") {
      showToast("error", "Please Enter Your Name", "");
      return;
    }
    try {
      const userDoc = await fetchDoc("Users", userDocId);
      await updateDoc(userDoc.docRef, { name: userName });

      router.push({
        pathname: "auth/create-account/address",
        params: { userDocId },
      });
    } catch (error) {
      console.log("Something Went Wrong", error);
      showToast("error", "Something Went Wrong");
    }
  };

  return (
    <View style={createAccountStyles.screenContainer}>
      <View style={createAccountStyles.headingContainer}>
        <Text style={[primaryStyles.heading, { textAlign: "left" }]}>
          Almost Done !
        </Text>
      </View>
      <Text style={createAccountStyles.emoji}>🧑‍💻</Text>
      <View style={[authStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={createAccountStyles.inputLabel}>
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
        onPress={handleUpdateUserName}
        mode="contained"
        style={{ marginTop: 20 }}
      >
        Continue
      </PrimaryButton>
    </View>
  );
}

import { Text, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../constants/Colors";
import { Divider, TextInput } from "react-native-paper";
import { authStyles } from "../styles";
import PrimaryButton from "../../../components/Primary/Button";
import { primaryStyles } from "../../../styles/primary";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebase.config";
import { showToast } from "../../../utils/toast";
import { addDoc, collection } from "firebase/firestore";
import { ERROR_TYPE } from "../../../constants/enum";

export default function Credentials() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  const handleCreateAccount = async () => {
    if (!email || !password) {
      showToast("error", "Error", "Please fill out all blanks");
      return;
    }

    try {
      setIsLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      // Add into database
      const createdAt = new Date();
      const userCollection = collection(db, "Users");
      const userDoc = await addDoc(userCollection, {
        email: user.email,
        createdAt,
      });
      showToast("success", "Create Account Successfully", "");
      // Wait for user to see the notification
      setTimeout(() => {
        router.replace({
          pathname: "auth/create-account/name",
          params: { userDocId: userDoc.id },
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log("Something went wrong: ", error);
      if (error.code === ERROR_TYPE.EMAIL_ALREADY_IN_USE) {
        showToast("error", "Email Existed Already", "");
      } else if (error.code === ERROR_TYPE.INVALID_EMAIL) {
        showToast("error", "Invalid Email", "");
      } else {
        showToast("error", "Something Went Wrong", "");
      }
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={primaryStyles.screenBackground}>
      {/* Missing Logo */}
      <Text style={[primaryStyles.heading, { textAlign: "left" }]}>
        Create New Account
      </Text>

      {/* Inputs Group */}
      <View style={authStyles.inputContainer}>
        <Text style={{ color: Colors.PRIMARY }}>Email</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
        />
      </View>
      <View style={authStyles.inputContainer}>
        <Text style={{ color: Colors.PRIMARY }}>Password</Text>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry={!isShowPassword}
          right={
            <TextInput.Icon
              icon={isShowPassword ? 'eye-off' : 'eye'}
              onPress={(e) => {
                e.preventDefault();
                setIsShowPassword(!isShowPassword);
              }}
            />
          }
        />
      </View>

      {/* Buttons Group */}
      <View style={authStyles.buttonContainer}>
        <PrimaryButton loading={isLoading} mode="contained" onPress={handleCreateAccount}>
          Continue
        </PrimaryButton>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider style={{ width: "40%" }} />
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 20,
              fontFamily: "open-sans-light",
            }}
          >
            or
          </Text>
          <Divider style={{ width: "40%" }} />
        </View>
        {/* <PrimaryButton
          icon='google'
          mode="outlined"
          labelStyle={{ color: Colors.PRIMARY }}
        >
          Sign Up With Google
        </PrimaryButton> */}
        <PrimaryButton
          mode="contained"
          style={{ backgroundColor: Colors.SECONDARY }}
        >
          Sign In
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

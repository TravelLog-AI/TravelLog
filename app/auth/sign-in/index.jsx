import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { Colors } from "../../../constants/Colors";
import { Button, Divider, TextInput } from "react-native-paper";
import { authStyles } from "../styles";
import PrimaryButton from "../../../components/Primary/Button";
import { useRouter } from "expo-router";
import { showToast } from "../../../utils/toast";
import { getAuth, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase.config";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      showToast("error", "Error", "Please fill out all blanks");
      return;
    }
    
    try {
      await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );

      showToast("success", "Success", "Login Successfully");
    } catch (error) {
      console.log("Something Went Wrong", error);
      showToast("error", "Somehing Went Wrong", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithCredential(auth, googleProvider)

      // Retrieve user credentials
      const userCredential = await auth.getRedirectResult();

      if (userCredential.user) {
        // User is signed in
        showToast('success', 'Success', 'Login Successfully');
      }
    } catch (error) {
      console.log('Something Went Wrong', error);
      showToast('error', 'Something Went Wrong', error.message);
    }
  };

  return (
    <ScrollView style={primaryStyles.screenBackground}>
      {/* MISSING: Logo */}
      <Text style={[primaryStyles.heading, { textAlign: "left" }]}>
        Welcome Back
      </Text>
      <Text
        style={[
          primaryStyles.heading,
          { color: Colors.PRIMARY, textAlign: "left", fontFamily: "open-sans" },
        ]}
      >
        Sign in to your account
      </Text>

      {/* Credential Inputs */}
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
        />
      </View>

      {/* Buttons Group */}
      <View style={authStyles.buttonContainer}>
        <PrimaryButton mode="contained" onPress={handleSignIn}>Sign In</PrimaryButton>
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
        <PrimaryButton
          icon="google"
          mode="outlined"
          labelStyle={{ color: Colors.PRIMARY }}
          onPress={handleSignInWithGoogle}
        >
          Continue With Google
        </PrimaryButton>
        <PrimaryButton
          mode="contained"
          style={{ backgroundColor: Colors.SECONDARY, marginTop: "8%" }}
          onPress={() => router.push("auth/create-account/credentials")}
        >
          Create An Account
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { primaryStyles } from "../../../styles/primary";
import { Colors } from "../../../constants/Colors";
import { Divider, Icon, TextInput } from "react-native-paper";
import { authStyles } from "../styles";
import PrimaryButton from "../../../components/Primary/Button";
import { useRouter } from "expo-router";
import { showToast } from "../../../utils/toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebase.config";
import { fetchData } from "../../../utils/db";
import { addDoc, collection, where } from "firebase/firestore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  // const [userInfo, setUserInfo] = useState();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: '394416992655-q0mvjtevk8ero9rfjn3akk79m94rv6sr.apps.googleusercontent.com',
  //   androidClientId: '394416992655-avnom04r959l40dtg64p7d6doa0ia112.apps.googleusercontent.com',
  //   webClientId: '394416992655-155lm030hitot5uel5qt63b3eeesfl90.apps.googleusercontent.com'
  // });

  const router = useRouter();

  // Collections
  const userCollection = collection(db, "Users");

  // useEffect(() => {
  //   // Make sure to handle other cases
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     console.log({response, credential}, 'log in information');
  //     signInWithCredential(auth, credential)
  //   }
  // }, [response])

  const handleSignIn = async () => {
    if (!email || !password) {
      showToast("error", "Error", "Please fill out all blanks");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      const userData = await fetchData(
        "Users",
        where("email", "==", email.toLowerCase())
      );

      // Handle if user does not exist in database
      if (userData.length === 0) {
        const createdAt = new Date();
        const userNewDoc = await addDoc(userCollection, {
          email: email.toLowerCase(),
          createdAt,
        });
        router.push({
          pathname: "auth/create-account/name",
          params: { userDocId: userNewDoc.id },
        });
        setIsLoading(false);

        return;
      }

      // Handle if user does not add their name to system
      const currentUser = userData[0];
      if (!currentUser?.name) {
        router.push({
          pathname: "auth/create-account/name",
          params: { userDocId: currentUser.id },
        });
        setIsLoading(false);

        return;
      }

      // Handle if user does not add their address to system
      if (!currentUser?.address) {
        router.push({
          pathname: "auth/create-account/address",
          params: { userDocId: currentUser.id },
        });
        setIsLoading(false);
        return;
      }

      showToast("success", "Success", "Login Successfully");

      // Navigate to home screen
      setTimeout(() => {
        router.replace('(tabs)/home');
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log("Something Went Wrong", error.code, error.message);
      if (error.code === "auth/invalid-credential") {
        showToast(
          "error",
          "Invalid Credentials",
          "Your email/password is incorrect"
        );
      } else {
        showToast("error", "Somehing Went Wrong", error);
      }
      setIsLoading(false);
    }
  };

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithCredential(auth, googleProvider);

  //     // Retrieve user credentials
  //     const userCredential = await auth.getRedirectResult();

  //     if (userCredential.user) {
  //       // User is signed in
  //       showToast("success", "Success", "Login Successfully");
  //     }
  //   } catch (error) {
  //     console.log("Something Went Wrong", error);
  //     showToast("error", "Something Went Wrong", error.message);
  //   }
  // };

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
        <PrimaryButton
          loading={isLoading}
          mode="contained"
          onPress={handleSignIn}
        >
          Sign In
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
          icon="google"
          mode="outlined"
          labelStyle={{ color: Colors.PRIMARY }}
          onPress={() => promptAsync()}
        >
          Continue With Google
        </PrimaryButton> */}
        <PrimaryButton
          mode="contained"
          style={{ backgroundColor: Colors.SECONDARY }}
          onPress={() => router.push("auth/create-account/credentials")}
        >
          Create An Account
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

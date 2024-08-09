import { Text, View } from "react-native";
import LandingScreen from '../components/LandingScreen';
import { Redirect } from "expo-router";
import { auth } from "../config/firebase.config";

export default function Index() {
  const user = auth.currentUser;

  console.log({auth: user})

  return (
    <View style={{flex: 1}}>
      {/* <LandingScreen /> */}
      { user ? <Redirect href={"/home"} /> : <LandingScreen />}
    </View>
  );
}

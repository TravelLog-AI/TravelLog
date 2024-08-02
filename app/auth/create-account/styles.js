import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

export const createAccountStyles = StyleSheet.create({
  headingContainer: {
    position: "absolute",
    top: 0,
    margin: 30,
    marginTop: 50,
  },
  emoji: {
    textAlign: "center",
    fontSize: 50,
  },
  inputLabel: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: Colors.PRIMARY,
  },
});

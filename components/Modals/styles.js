import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const modalStyles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    height: "80%",
    margin: 0,
  },
  closeButtonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
});
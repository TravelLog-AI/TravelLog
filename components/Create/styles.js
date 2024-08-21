import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const createStyles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "80%",
    margin: 0,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
  },
  heading: {
    color: Colors.BLACK,
    textAlign: "left",
    fontSize: 25,
  },
  subtitle: {
    color: Colors.DARK_GREY,
    textAlign: "left",
    fontSize: 15,
  },
  sectionHeading: {
    color: Colors.BLACK,
    textAlign: "left",
    fontSize: 20,
    marginTop: 30,
  },
  textInput: { marginTop: 10, backgroundColor: Colors.PRIMARY_BACKGROUND },
});

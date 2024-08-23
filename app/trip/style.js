import { StyleSheet } from "react-native";
import { primaryStyles } from "../../styles/primary";
import { Colors } from "../../constants/Colors";

export const tripOverviewStyle = StyleSheet.create({
  tabButtonContainer: {
    position: "relative",
    left: 20,
    bottom: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  tabButton: {
    width: 60,
    borderRadius: 10,
    shadowColor: "rgba(100, 100, 111, 1)",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 29 / 2,
    elevation: 7,
  },
  heading: {
    ...primaryStyles.heading,
    marginLeft: 20,
    fontSize: 20,
    textAlign: "left",
    marginTop: 0,
  },
  subtitle: {
    ...primaryStyles.subtitle,
    fontSize: 10,
    textAlign: "left",
    // marginLeft: 20,
    marginTop: 0,
    color: Colors.DARK_GREY,
  },
  subTab: {
    width: 110,
    textAlign: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
  },
  subTabText: {
    fontSize: 15,
    color: Colors.PRIMARY,
  },
});

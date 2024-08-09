import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const tabsStyles = StyleSheet.create({
    screenContainer: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.PRIMARY_BACKGROUND,
        height: '100%'
    },
    createTripButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
    }
})
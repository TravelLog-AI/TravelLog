import { StyleSheet } from "react-native";
import { Colors } from "./../constants/Colors";

export const landingScreenStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 4,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        flexDirection: 'column',
        gap: 12
    }
})
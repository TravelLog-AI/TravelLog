import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export const primaryStyles = StyleSheet.create({
    screenBackground: {
        backgroundColor: Colors.PRIMARY_BACKGROUND,
        height: '100%',
        padding: 25,
        paddingTop: '10%'
    },
    heading: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        marginTop: 20,
        color: Colors.PRIMARY
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'open-sans-medium',
        color: Colors.LIGHT_PRIMARY,
        textAlign: 'center',
        marginTop: 10,
    },
    helperText: {
        fontSize: 15,
        fontFamily: 'open-sans-medium',
        color: Colors.LIGHT_PRIMARY,
        textAlign: 'center',
        marginTop: 10,
    },
    primaryButton: {
        padding: 8,
        borderRadius: 20,
        borderColor: Colors.PRIMARY,
    },
    primaryButtonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 20
    }

})
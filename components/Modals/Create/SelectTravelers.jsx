import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";
import { Colors } from "../../../constants/Colors";

export default function SelectTravelers({
  numberOfTravelers,
  setNumberOfTravelers,
}) {
  return (
    <View
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={2}
    >
      <View style={{ width: "50%" }}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
          <Chip
            key={number}
            style={[
              styles.chipStyle,
              {
                borderWidth: numberOfTravelers === number ? 2 : 0,
                borderColor: numberOfTravelers === number ? Colors.PRIMARY : "",
              },
            ]}
            onPress={() => setNumberOfTravelers(number)}
          >
            {number <= 10 ? `${number} people` : "More than 10 people"}
          </Chip>
        ))}
      </View>
      <View style={{ width: "50%" }}>
        {Array.from({ length: 6 }, (_, i) => i + 6).map((number) => (
          <Chip
            key={number}
            style={[
              styles.chipStyle,
              {
                borderWidth: numberOfTravelers === number ? 2 : 0,
                borderColor: numberOfTravelers === number ? Colors.PRIMARY : "",
              },
            ]}
            onPress={() => setNumberOfTravelers(number)}
          >
            {number <= 10 ? `${number} people` : "More than 10 people"}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chipStyle: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
    color: Colors.WHITE,
    textAlign: "center",
  },
});

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { selectBudgetOptions } from "../../../constants/Options";
import { Chip } from "react-native-paper";
import { Colors } from "../../../constants/Colors";

export default function SelectBudget({ selectedBudget, setSelectedBudget }) {
  return (
    <ScrollView horizontal marginTop={10}>
      {selectBudgetOptions.map((budget) => {
        return (
          <Chip
            key={budget.id}
            style={[
              styles.chipStyle,
              {
                borderWidth: selectedBudget === budget.title ? 2 : 0,
                borderColor:
                  selectedBudget === budget.title ? Colors.PRIMARY : "",
              },
            ]}
            onPress={() => setSelectedBudget(budget.title)}
          >
            {budget.icon} {budget.title}
          </Chip>
        );
      })}
    </ScrollView>
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

import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { primaryStyles } from "../../styles/primary";

export default function PrimaryButton({ children, style, labelStyle, ...props }) {
  return (
    <Button
      style={[
        primaryStyles.primaryButton,
        {
          ...style,
          borderColor: props.variant === "outlined" ? Colors.PRIMARY : "",
        },
      ]}
      labelStyle={{ fontSize: 20, ...labelStyle }}
      {...props}
    >
      {children}
    </Button>
  );
}

import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { primaryStyles } from "../../styles/primary";

export default function PrimaryButton({
  children,
  style,
  labelStyle,
  loading = false, // Add a loading prop
  accessibilityLabel = "Button",
  variant = "contained", // Default variant prop
  badgeContent = null,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        primaryStyles.primaryButton,
        {
          backgroundColor:
            (variant === "outlined" || variant === "standard") ? "transparent" : Colors.PRIMARY,
          borderColor: variant === "outlined" ? Colors.PRIMARY : '',
          borderWidth: variant === "outlined" ? 2 : 0,
          opacity: loading ? 0.7 : 1, // Reduce opacity when loading
          padding: 15,
          justifyContent: "center", // Add this line
          alignItems: "center", // Add this line
          ...style,
        },
      ]}
      activeOpacity={0.7} // Provide feedback on press
      disabled={loading || props.disabled} // Disable when loading
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} /> // Show loader when loading
      ) : (
        <Text
          style={[
            {
              fontSize: 20,
              color: (variant === "outlined" || variant === 'standard') ? Colors.PRIMARY : Colors.WHITE,
              textAlign: "center",
            },
            labelStyle,
          ]}
        >
          {children}
        </Text>
      )}

      {badgeContent && (
        <View
          style={{
            position: "absolute",
            top: -15,
            right: -5,
            backgroundColor: Colors.SECONDARY,
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 5,
            zIndex: 1,
          }}
        >
          <Text
            style={{ color: Colors.WHITE, fontSize: 12, fontWeight: "bold" }}
          >
            {badgeContent}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// import { Text, TouchableOpacity } from "react-native";
// import React from "react";
// import { Button } from "react-native-paper";
// import { Colors } from "../../constants/Colors";
// import { primaryStyles } from "../../styles/primary";

// export default function PrimaryButton({ children, style, labelStyle, ...props }) {
//   return (
//     <Button
//       style={[
//         primaryStyles.primaryButton,
//         {
//           ...style,
//           borderColor: props.variant === "outlined" ? Colors.PRIMARY : "",
//         },
//       ]}
//       labelStyle={{ fontSize: 20, ...labelStyle }}
//       {...props}
//       touchableRef={<TouchableOpacity />}
//     >
//       {children}
//     </Button>
//   );
// }
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";
import { primaryStyles } from "../../styles/primary";

export default function PrimaryButton({
  children,
  style,
  labelStyle,
  loading = false, // Add a loading prop
  accessibilityLabel = "Button",
  variant = "contained", // Default variant prop
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        primaryStyles.primaryButton,
        {
          backgroundColor: variant === "outlined" ? "transparent" : Colors.PRIMARY,
          borderColor: Colors.PRIMARY,
          borderWidth: variant === "outlined" ? 2 : 0,
          opacity: loading ? 0.7 : 1, // Reduce opacity when loading
          padding: 15,
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
        <Text style={[{ fontSize: 20, color: variant === "outlined" ? Colors.PRIMARY : Colors.WHITE, textAlign: 'center' }, labelStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

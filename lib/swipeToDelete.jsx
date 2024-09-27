import { Animated, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const renderRightAction = (progress, dragX, handleDelete) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity
      onPress={handleDelete}
      style={{
        backgroundColor: Colors.ERROR,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        padding: 10,
        borderRadius: 15,
        // height: '100%'
        marginVertical: 15,
        gap: 10,
      }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <FontAwesome name="trash-o" size={24} color={Colors.WHITE} />
      </Animated.View>
      <Animated.Text
        style={{
          fontFamily: "open-sans-bold",
          color: Colors.WHITE,
          transform: [{ scale }],
        }}
      >
        Delete
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default renderRightAction;
import { View, Text, Image, Animated, InteractionManager } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { db } from "../../config/firebase.config";
import { Colors } from "../../constants/Colors";
import { AI_PROMPT } from "../../constants/AI";
import { chatSession } from "../../config/AIModal";
import { CreateTripContext } from "../../context/CreateTripContext";
import { showToast } from "../../utils/toast";
import Modal  from "react-native-modal";
import { createStyles } from "./styles";

export default function GeneratingAIScreen({ open, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useContext(UserContext);
  // const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  // Animated
  const animatedValues = useRef(
    "Please Wait...".split("").map(() => new Animated.Value(0))
  ).current;

  // Collections
  const tripsCollection = collection(db, "Trips");

  useEffect(() => {
    // Animate each character sequentially
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10, // Move up
          duration: 300,
          delay: index * 100, // Delay based on character index for sequential effect
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0, // Move back down
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
    });

    // Start the animation loop
    Animated.loop(Animated.stagger(100, animations)).start();

    // Cleanup animation on component unmount
    return () => animatedValues.forEach((value) => value.stopAnimation());
  }, []);

  // const generateAiTrip = async () => {
  //   try {
  //     console.log('Run AI');
  //     const parsedTripData = JSON.parse(tripData);

  //     const startDate = new Date(parsedTripData.startDate);
  //     const endDate = new Date(parsedTripData.endDate);
  //     const FINAL_PROMPT = AI_PROMPT.replace(
  //       "{departureLocation}",
  //       userData?.address?.name
  //     )
  //       .replace("{arrivalLocation}", parsedTripData.address.name)
  //       .replace("{startDate}", startDate.toDateString())
  //       .replace("{endDate}", endDate.toDateString())
  //       .replace("{numberOfTravelers}", parsedTripData.numberOfTravelers)
  //       .replace("{budget}", parsedTripData.selectedBudget)

  //       console.log(FINAL_PROMPT, 'final prompt');
  //     // Generate AI Trip
  //     const result = await chatSession.sendMessage(FINAL_PROMPT);

  //     const tripRes = JSON.parse(result.response.text());
  //     const createdAt = new Date();

  //     // Add trip to DB
  //     await addDoc(tripsCollection, {
  //       userDocId: userData.docId,
  //       tripData: tripRes, // AI Result
  //       createdAt,
  //     });

  //     setIsLoading(false);
  //     setTripData(null);
  //   } catch (error) {
  //     console.log('Something Went Wrong: ', error);
  //     showToast('error', 'Something Went Wrong', error);
  //   }
  // };

  return (
    <View>
      <Modal
        style={[createStyles.container, {paddingTop: 75}]}
        isVisible={open}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {"Please Wait...".split("").map((char, index) => (
            <Animated.Text
              key={index}
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 35,
                textAlign: "center",
                transform: [{ translateY: animatedValues[index] }],
              }}
            >
              {char}
            </Animated.Text>
          ))}
        </View>
        <Text
          style={{
            fontFamily: "open-sans-medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          We are creating your personalized itinerary to turn your dream trip
          into a reality.
        </Text>
        <Image
          style={{ width: "100%", height: 200, objectFit: "contain" }}
          source={require("./../../assets/images/giphy.gif")}
        />
        <Text
          style={{
            fontFamily: "open-sans",
            color: Colors.DARK_GREY,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Do not go back
        </Text>
      </Modal>
    </View>
  );
}

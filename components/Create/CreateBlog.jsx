import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { primaryStyles } from "../../styles/primary";
import { createStyles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import { UserContext } from "../../context/UserContext";
import { fetchData } from '../../utils/db';
import { addDoc, collection, where } from "firebase/firestore";
import NotFound from "../NotFound";
import DestinationSummary from "../DestinationSummary";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "../Primary/Button";
import { db } from "../../config/firebase.config";
import { GetPhotoRef } from "../../utils/googleMap";

export default function CreateBlog({onClose, showToast}) {
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      fetchUserTrips();
    }
  }, [userData]);

  const fetchUserTrips = async () => {
    try {
      const trips = await fetchData('Trips', where('userId', '==', userData.docId));

      setUserTrips(trips);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  }

  const minimizeDate = (longDate) => {
    return longDate.split(' ').slice(1, 4).join(' ');
  }

  const handleCreateBlog = async () => {
    if (title === '' || description === '' || selectedTrip === null) {
      showToast('error', 'Please fill out all fields', '');
      return;
    }
    try {
      setIsCreating(true);
      const blogCollection = collection(db, 'Blogs');

      const photoRef = await GetPhotoRef(selectedTrip.tripData.trip.destination);
      await addDoc(blogCollection, {
        title,
        description,
        tripId: selectedTrip.id,
        userId: userData.docId,
        userName: userData.name,
        createdAt: new Date(),
        likes: 0,
        views: 0,
        photoRef,
        destination: selectedTrip.tripData.trip.destination
      });

      setIsCreating(false);
      
      showToast('success', 'Create Your Blog Successfully');
      
      setTimeout(() => {
        onClose();
      }, 1000);
      // onClose();
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  }

  return (
    <ScrollView>
      <Text style={[primaryStyles.heading, createStyles.heading, {marginTop: 10}]}>
        Let's Share Your Experience ✍🏻
      </Text>
      <Text style={[primaryStyles.subtitle, createStyles.subtitle]}>
        Connecting through stories and building stronger communities together
      </Text>

      {/* Title */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Title
      </Text>
      <TextInput
        placeholder="Write your title..."
        left={
          <TextInput.Icon
            icon={() => <MaterialIcons name="title" size={20} color="black" />}
          />
        }
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={createStyles.textInput}
      />

      {/* Description */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Description
      </Text>
      <TextInput
        placeholder="Write your description..."
        left={
          <TextInput.Icon
            icon={() => <FontAwesome name="pencil" size={20} color="black" />}
          />
        }
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={createStyles.textInput}
        multiline
      />

      {/* Your Trip */}
      <Text style={[primaryStyles.heading, createStyles.sectionHeading]}>
        Your Trip
      </Text>
      <ScrollView horizontal style={{marginTop: 20}}>
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  borderWidth: selectedTrip && selectedTrip.id === trip.id ? 2 : 0,
                  borderColor: Colors.PRIMARY,
                  marginHorizontal: 10,
                  borderRadius: 20,
                }}
                onPress={() => setSelectedTrip(trip)}
              >
                <DestinationSummary
                  location={trip.tripData.trip.destination}
                  style={{ marginHorizontal: 0 }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 10,
                    backgroundColor: Colors.SECONDARY,
                    padding: 5,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "open-sans-medium",
                      fontSize: 10,
                      color: Colors.WHITE,
                    }}
                  >
                    {minimizeDate(trip.tripData.trip.start_date)} -{" "}
                    {minimizeDate(trip.tripData.trip.end_date)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={{justifyContent: 'center', alignContent: 'center', width: '100%'}}>
            <NotFound text="You currently have no trip" />
          </View>
        )}
      </ScrollView>
      <PrimaryButton
        onPress={handleCreateBlog}
        style={{ width: "100%", padding: 10, marginTop: 30 }}
        // badgeContent="AI Powered 🤖"
        loading={isCreating}
      >
        Create
      </PrimaryButton>
    </ScrollView>
  );
}

import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { tabsStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import CreateModal from "../../components/Modals/Create/Create";
import { Colors } from "../../constants/Colors";
import { Avatar } from "react-native-paper";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BlogSummary from "../../components/BlogSummary";
import DestinationSummary from "../../components/DestinationSummary";
import BlogPost from "../../components/BlogPost";
import { UserContext } from "../../context/UserContext";
import { showToast } from "../../utils/toast";
import { GetPhotoRef } from "../../utils/googleMap";
import { getPhoto } from "../../utils/map";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('');

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData && userData?.address?.name) {
      generatePhotoURL();
    }
  }, [userData])

  const generatePhotoURL = async () => {
    try {
      const photoRef = await GetPhotoRef(userData.address.name);
      const photoLink = getPhoto(photoRef);
      setPhotoURL(photoLink)
    } catch (error) {
      console.log('There was an error in generate photo url: ', error);
      showToast('error', 'There was an error in generate photo url', error);
    }
  }


  return (
    <View>
      <ScrollView
        // keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          // height: "100%",
          backgroundColor: Colors.WHITE,
        }}
      >
        <CreateModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />

        {/* Image where user is currently located */}
        <View
          style={{
            backgroundColor: Colors.LIGHT_BACKGROUND,
            width: "100%",
            flex: 1,
            height: 200,
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: photoURL }}
            style={{ width: "100%", height: "100%" }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              // marginHorizontal: "5%",
              marginVertical: 10,
              flex: 1,
              paddingHorizontal: '5%',
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
                width: "100%",
                // marginRight: '5%'
              }}
            >
              <Avatar.Text
                size={40}
                label={userData?.name?.slice(0, 1) || ""}
              />
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <FontAwesome6
                  name="location-dot"
                  size={15}
                  color={Colors.LIGHT_PRIMARY}
                />
                <Text
                  style={{
                    fontFamily: "open-sans",
                    fontSize: 15,
                    color: Colors.LIGHT_PRIMARY,
                  }}
                >
                  {userData?.address.name || ""}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: Colors.PRIMARY,
                paddingHorizontal: 10,
                paddingVertical: 5,
                alignSelf: "flex-start", // Ensures the View only takes up as much width as its content
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 20,
                  color: Colors.WHITE,
                }}
              >
                Welcome back, Bin Mai 👋
              </Text>
            </View>
          </View>
        </View>

        {/* Top Destinations */}
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
            marginVertical: 20,
            marginHorizontal: "5%",
          }}
        >
          Top Destinations
        </Text>
        <ScrollView
          horizontal
          style={{ display: "flex", flexDirection: "row", gap: 10 }}
        >
          <DestinationSummary />
          <DestinationSummary />
          <DestinationSummary />
        </ScrollView>

        {/* Features Blogs */}
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
            marginVertical: 20,
            marginHorizontal: "5%",
          }}
        >
          Top Blogs Of This Week
        </Text>
        <View
          // horizontal
          style={{
            display: "flex",
            gap: 20,
            paddingBottom: 100,
            marginHorizontal: 20,
            marginRight: 50,
          }}
        >
          {/* <BlogSummary />
        <BlogSummary />
        <BlogSummary /> */}
          <BlogPost />
          <BlogPost />
          <BlogPost />
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={tabsStyles.createTripButton}
        onPress={() => setIsCreateOpen(true)}
      >
        <Ionicons name="add-circle" size={70} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
}

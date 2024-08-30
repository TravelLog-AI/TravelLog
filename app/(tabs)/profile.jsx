import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import PrimaryButton from "../../components/Primary/Button";
import { Colors } from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import MyTrips from "../../components/Profile/MyTrips";
import { profileTabs } from "../../constants/arrays";
import MyBlogs from "../../components/Profile/MyBlogs";
import { showToast } from "../../utils/toast";
import { fetchData } from "../../utils/db";
import { where } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState(profileTabs[0].id);
  const [userTrips, setUserTrips] = useState([]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      fetchUserTrips();
    }
  }, [userData]);

  const fetchUserTrips = async () => {
    try {
      const fetchedTrips = await fetchData(
        "Trips",
        where("userDocId", "==", userData.docId)
      );

      setUserTrips(fetchedTrips);
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.LIGHT_BACKGROUND }}>
      <SafeAreaView
        style={{
          dipslay: "flex",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.WHITE,
        }}
      >
        <Avatar.Text size={100} label={userData.name.slice(0,2)} />
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {userData?.name}
        </Text>
        <PrimaryButton
          labelStyle={{ fontSize: 15 }}
          style={{ padding: 10, borderRadius: 10 }}
        >
          Edit Profile
        </PrimaryButton>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "60%",
            marginVertical: 20,
          }}
        >
          {profileTabs.map((tab, index) => {
            let icon;
            if (currentTab === tab.id) {
              icon = profileTabs[index].getIcon(Colors.PRIMARY);
            } else {
              icon = profileTabs[index].getIcon(Colors.DARK_GREY);
            }

            return (
              <TouchableOpacity
                onPress={() => setCurrentTab(tab.id)}
                key={index}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {icon}
                  <Text
                    style={{
                      fontFamily: "open-sans-medium",
                      fontSize: 15,
                      color:
                        currentTab === tab.id
                          ? Colors.PRIMARY
                          : Colors.DARK_GREY,
                    }}
                  >
                    {tab.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>

      <View
        style={{ backgroundColor: Colors.WHITE, marginTop: 20, padding: 10 }}
      >
        {currentTab === profileTabs[0].id ? (
          <MyTrips trips={userTrips} />
        ) : (
          <MyBlogs />
        )}
      </View>
    </ScrollView>
  );
}

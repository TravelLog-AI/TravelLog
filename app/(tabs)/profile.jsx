import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { showToast } from "../../utils/toast";
import { fetchData } from "../../utils/db";
import { where } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import EditProfile from "../../components/Modals/EditProfile";
import ProfileContent from "../../components/Profile/ProfileContent";

export default function Profile() {
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      fetchUserBlogs();
      fetchUserTrips();
      
    }
  }, [userData]);

  const fetchUserBlogs = async () => {
    try {
      const fetchedBlogs = await fetchData('Blogs', where("userId", "==", userData.docId));

      setUserBlogs(fetchedBlogs);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error: ', error);
    }
  }

  const fetchUserTrips = async () => {
    try {
      const fetchedTrips = await fetchData(
        "Trips",
        where("userId", "==", userData.docId)
      );

      setUserTrips(fetchedTrips);
    } catch (error) {
      console.log("There was an error: ", error);
      showToast("error", "There was an error", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.LIGHT_BACKGROUND }}>
      <EditProfile open={isOpenEditProfile} onClose={() => setIsOpenEditProfile(false)} />
        <ProfileContent 
          userData={userData}
          userBlogs={userBlogs}
          userTrips={userTrips}
          onClick={() => setIsOpenEditProfile(true)}
          isOwner={true}
        />
    </ScrollView>
  );
}

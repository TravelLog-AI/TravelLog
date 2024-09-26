import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchData, fetchDoc } from "../../../utils/db";
import { where } from "firebase/firestore";
import ProfileContent from "../../../components/Profile/ProfileContent";
import { showToast } from "../../../utils/toast";
import Loading from "../../../components/Loading";

export default function ViewProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await fetchDoc("Users", id);

        const fetchedBlogs = await fetchData(
          "Blogs",
          where("userId", "==", id)
        );

        const fetchedTrips = await fetchData(
          "Trips",
          where("userId", "==", id)
        );
        setUserData({
          user: fetchedUser.docData,
          blogs: fetchedBlogs,
          trips: fetchedTrips,
        });
        setIsLoading(false);
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "There was an error", error);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <ProfileContent
        userData={userData?.user || {}}
        userBlogs={userData?.blogs || []}
        userTrips={userData?.trips || []}
      />
    </ScrollView>
  );
}

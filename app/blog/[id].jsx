import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import TripHeading from '../../components/TripDetails/TripHeading';
import { showToast } from '../../utils/toast';
import { fetchDoc, updateSingleDoc } from '../../utils/db';
import { tripDetailTabs } from '../../constants/arrays';
import { TripOverviewContent } from '../../components/TripDetails/TripOverview';
import { Avatar, Divider } from 'react-native-paper';
import Landmarks from '../../components/Landmarks';
import TripItinerary from '../../components/TripDetails/TripItinerary';
import TripAdvisor from '../../components/TripDetails/TripAdvisor';
import { Colors } from '../../constants/Colors';
import { primaryStyles } from '../../styles/primary';
import PrimaryButton from '../../components/Primary/Button';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from "../../context/UserContext";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

const OverviewBlog = ({blogData, tripId}) => {
  return (
    <ScrollView style={{ paddingBottom: 20, height: "100%" }}>
      <View style={{ marginVertical: 10 }}>
        <TripOverviewContent tripData={blogData?.tripData?.tripData?.trip} />
      </View>

      <Divider style={{ marginVertical: 10 }} />

      <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 10 }}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
          }}
        >
          {blogData?.title}
        </Text>
        <Text
          style={{
            fontFamily: "open-sans",
            fontSize: 15,
          }}
        >
          {blogData?.description}
        </Text>
      </View>

      <Divider style={{ marginVertical: 10 }} />

      <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 10 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
          Landmarks
        </Text>
        <Landmarks
          tripData={blogData?.tripData?.tripData?.trip}
          tripId={tripId}
          coordinates={blogData?.tripData?.coordinates}
        />
      </View>
    </ScrollView>
  );
}

export default function BlogDetails() {
  const [likes, setLikes] = useState([]);
  const [blogData, setBlogData] = useState();
  const [currentTripTab, setCurrentTripTab] = useState("Overview");
  const { id } = useLocalSearchParams();
  const { userData } = useContext(UserContext);

  const isLike = useMemo(() => {
    const hasLike = likes.some((like) => like.likedBy === userData.docId);

    return hasLike;
  }, [likes]);

  useEffect(() => {
    fetchTripData();
  }, []);

  useEffect(() => {
    const likesQuery = query(
      collection(db, "Likes"),
      where("blogId", "==", id)
    );
    const unsubscribe = onSnapshot(likesQuery, (querySnapshot) => {
      const likesData = [];
      querySnapshot.forEach((doc) => {
        likesData.push(doc.data());
      });
      setLikes(likesData);
    });
    return () => unsubscribe();
  }, [id]);

    useEffect(() => {
      if (blogData) {
        handleAddView();
      }
    }, [blogData]);

    const fetchTripData = async () => {
      try {
        const blogResponse = await fetchDoc("Blogs", id);
        const tripResponse = await fetchDoc(
          "Trips",
          blogResponse.docData.tripId
        );

        setBlogData({
          ...blogResponse.docData,
          tripData: tripResponse.docData,
        });
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "Something went wrong. Please try again.", error);
      }
    };

    const handleAddView = async () => {
      console.log(blogData.views, 'viewas')
      try {
        await updateSingleDoc("Blogs", id, {
          views: blogData.views + 1,
        });
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "Something went wrong. Please try again.", error);
      }
    }

    const handleLike = async () => {
      try {
        const likesCollection = collection(db, 'Likes');
        
        const createdAt = new Date();
        await addDoc(likesCollection, {
          likedBy: userData.docId,
          likedAt: createdAt,
          blogId: id,
        });
  
        await updateSingleDoc('Blogs', id, {likes: blogData.likes + 1});
  
      } catch (error) {
        console.log('There was an error: ', error);
        showToast('error', 'There was an error', error);
      }
    };
  
    const handleUnlike = async () => {
      try {
        const likesCollection = collection(db, "Likes");

        const likesQuery = query(
          likesCollection,
          where("blogId", "==", id),
          where("likedBy", "==", userData.docId)
        );
        const querySnapshot = await getDocs(likesQuery);

        const deletePromise = querySnapshot.docs.map(async (likeDoc) => {
          await deleteDoc(doc(db, "Likes", likeDoc.id));
        });

        await Promise.all(deletePromise);
        await updateSingleDoc("Blogs", id, { likes: blogData.likes - 1 });
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "There was an error", error);
      }
    };

  return (
    <View style={{ height: "100%" }}>
      <TripHeading
        tripData={blogData?.tripData || {}}
        currentTripTab={currentTripTab}
        setCurrentTripTab={setCurrentTripTab}
      />

      {currentTripTab === tripDetailTabs[0].name ? (
        <OverviewBlog blogData={blogData} tripid={id} />
      ) : currentTripTab === tripDetailTabs[1].name ? (
        <TripItinerary
          itineraryData={blogData?.tripData?.tripData?.trip.itinerary || []}
          tripLandmarks={blogData?.tripData?.tripData?.trip?.landmarks || []}
          tripId={id}
        />
      ) : (
        <TripAdvisor />
      )}

      {/* Small bottom tab info */}
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: "100%",
            height: 60,
            backgroundColor: Colors.WHITE,
            position: "absolute",
            bottom: 0,
          },
          primaryStyles.boxShadow,
        ]}
      >
        <View flexDirection="row" gap={2} alignItems="center">
          <PrimaryButton
            onPress={() => {
              if (isLike) {
                handleUnlike();
              } else {
                handleLike();
              }
            }}
            style={{
              padding: 5,
              backgroundColor: "transparent",
              margin: 0,
            }}
          >
            <AntDesign
              name={isLike ? "like1" : "like2"}
              size={20}
              color={isLike ? Colors.PRIMARY : "grey"}
            />
          </PrimaryButton>
          <Text
            style={{
              fontFamily: "open-sans",
              color: Colors.DARK_GREY,
              fontSize: 15,
            }}
          >
            {likes.length || 0}
          </Text>
        </View>
        <View flexDirection="row" gap={5} alignItems="center">
          <AntDesign name="eyeo" size={20} color="grey" />
          <Text
            style={{
              fontFamily: "open-sans",
              color: Colors.DARK_GREY,
              fontSize: 15,
            }}
          >
            {blogData?.views || 0}
          </Text>
        </View>
        <View flexDirection="row" gap={10} alignItems="center">
          <Avatar.Text size={30} label={blogData?.userName?.charAt(0)} />
          <Text
            style={{
              fontFamily: "open-sans-medium",
              fontSize: 15,
              color: Colors.DARK_GREY,
            }}
          >
            {blogData?.userName}
          </Text>
        </View>
      </View>
    </View>
  );
}
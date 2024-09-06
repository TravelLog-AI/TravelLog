import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { tabsStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import CreateModal from "../../components/Modals/Create/Create";
import { Colors } from "../../constants/Colors";
import { Avatar, Divider } from "react-native-paper";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DestinationSummary from "../../components/DestinationSummary";
import { UserContext } from "../../context/UserContext";
import { showToast } from "../../utils/toast";
import { GetPhotoRef } from "../../utils/googleMap";
import { getPhoto } from "../../utils/map";
import { fetchData } from "../../utils/db";
import { Timestamp, where } from "firebase/firestore";
import NotFound from "../../components/NotFound";
import BlogPost from "../../components/BlogPost";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=');
  const [topDestinations, setTopDestinations] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData && userData?.address?.name) {
      generatePhotoURL();
    }
  }, [userData]);

  useEffect(() => {
    fetchLast3MonthsTrip();
    fetchTop10BlogsOfTheMonth();
  }, [])

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

  // Get last 3 months trips
  const fetchLast3MonthsTrip = async () => {
    try {
      const today = new Date();
      const threeMonthsAgo = new Date(today);

      threeMonthsAgo.setMonth(today.getMonth() - 3);

      // Convert to Firebase Timestamp
      const threeMonthsAgoTimestamp = Timestamp.fromDate(threeMonthsAgo);

      const trips = await fetchData('Trips', where('createdAt', '>=', threeMonthsAgoTimestamp));

      const lastThreeMonthsTopDestinations = getTopDestinations(trips);

      setTopDestinations(lastThreeMonthsTopDestinations);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error)
    }
  }

  const getTopDestinations = (trips) => {
    if (trips.length === 0) {
      return [];
    }

    const destinationCount = {};

    for (const trip of trips) {
      const destination = trip.tripData.trip.destination;
      // const destinationKey = `${destination} - ${trip.photoRef}`

      if (!destinationCount[destination]) {
        destinationCount[destination] = 1;
      } else {
        destinationCount[destination]++;
      }
    }

    // If object has more than 10 pairs -> only get 10 highest
    const sortedDestinations = Object.keys(destinationCount).sort((destinationA, destinationB) => {
      return destinationCount[destinationB] - destinationCount[destinationA];
    });

    if (Object.keys(destinationCount).length > 10) {
      return sortedDestinations.slice(0, 10);
    } 

    return sortedDestinations;
  }

  const fetchTop10BlogsOfTheMonth = async () => {
    try {
      const today = new Date();
      const firstDayOfThisMonth = new Date(today);

      firstDayOfThisMonth.setDate(1);

      // Convert to Firebase Timestamp
      const firstDayTimestamp = Timestamp.fromDate(firstDayOfThisMonth);

      const blogs = await fetchData('Blogs', where('createdAt', '>=', firstDayTimestamp));

      const sortedTopBlogs = sortBlogsByLikesAndViews(blogs);
      setTopBlogs(sortedTopBlogs);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error)
    }
  }

  const sortBlogsByLikesAndViews = (blogList) => {
    const sortedBlogs = blogList.sort((blogA, blogB) => {
      if (blogB.likes !== blogA.likes) {
        return blogB.likes - blogA.likes;
      }

      return blogB.views - blogA.views
    });

    if (sortedBlogs.length > 10) {
      return sortedBlogs.slice(0, 10);
    }
    return sortedBlogs;
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
          {/* <DestinationSummary />
          <DestinationSummary />
          <DestinationSummary /> */}
          {
            topDestinations.length > 0 && topDestinations.map((destination, index) => {
              return (
                <DestinationSummary key={index} location={destination}/>
              )
            })
          }
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
          Top Blogs Of This Month
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
          {
            topBlogs.length > 0 ? topBlogs.map((blog, index) => {
              return (
                <Fragment key={index}>
                  <BlogPost blog={blog}/>
                  <Divider />
                </Fragment>
              )
            }) : (
              <NotFound text="No Blogs Found"/>
            )
          }
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

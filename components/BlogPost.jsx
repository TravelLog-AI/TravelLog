import { View, Text, Image, TouchableHighlight, Animated } from 'react-native'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar } from 'react-native-paper'
import { Colors } from '../constants/Colors'
import moment from 'moment';
import AntDesign from '@expo/vector-icons/AntDesign';
import PrimaryButton from './Primary/Button';
import { showToast } from '../utils/toast';
import { UserContext } from '../context/UserContext';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { fetchData, updateSingleDoc } from '../utils/db';
import { db } from '../config/firebase.config';
import { useRouter } from 'expo-router';

export default function BlogPost({blog}) {
  const [likes, setLikes] = useState([]);

  const router = useRouter();
  const { userData } = useContext(UserContext);

  // Animation
  const scaleValue = useRef(new Animated.Value(1)).current;


  const isLike = useMemo(() => {
    const hasLike = likes.some((like) => like.likedBy === userData.docId);
    
    return hasLike;
  
  }, [likes]);

  useEffect(() => {
    const likesQuery = query(collection(db, 'Likes'), where('blogId', '==', blog.id));
    const unsubscribe = onSnapshot(likesQuery, (querySnapshot) => {
      const likesData = [];
      querySnapshot.forEach((doc) => {
        likesData.push(doc.data());
      });
  
      setLikes(likesData);
    });

    return () => unsubscribe();
  }, [blog]);

  const handleLike = async () => {
    try {
      const likesCollection = collection(db, 'Likes');
      
      const createdAt = new Date();
      await addDoc(likesCollection, {
        likedBy: userData.docId,
        likedAt: createdAt,
        blogId: blog.id,
      });

      await updateSingleDoc('Blogs', blog.id, {likes: blog.likes + 1});

    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  };

  const handleUnlike = async () => {
    try {
      const likesCollection = collection(db, 'Likes');
      
      const likesQuery = query(
        likesCollection,
        where("blogId", "==", blog.id),
        where("likedBy", "==", userData.docId)
      );
      const querySnapshot = await getDocs(likesQuery);

      const deletePromise = querySnapshot.docs.map(async (likeDoc) => {
        await deleteDoc(doc(db, 'Likes', likeDoc.id));
      });

      await Promise.all(deletePromise);
      await updateSingleDoc('Blogs', blog.id, {likes: blog.likes - 1});
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Scale up to 1.05x
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Scale back to 1x
      useNativeDriver: true,
    }).start();
  };


  const directToDetails = () => {
    router.push(`/blog/${blog.id}`)
  }

  return (
    <TouchableHighlight
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={directToDetails}
      underlayColor={Colors.LIGHT_BACKGROUND}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
            paddingRight: 50,
          }}
        >
          <Avatar.Text size={30} label="B" />

          <View>
            {/* User & Post Info */}
            <View>
              <Text style={{ fontFamily: "open-sans-bold", fontSize: 15 }}>
                {blog?.userName}
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans",
                  fontSize: 15,
                  color: Colors.DARK_GREY,
                }}
              >
                {moment(blog?.createdAt.toDate()).fromNow()}
              </Text>
            </View>

            {/* Post Heading */}
            <View>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 20,
                  marginVertical: 10,
                }}
              >
                {blog?.title}
              </Text>
              <Text style={{ fontFamily: "open-sans", fontSize: 15 }}>
                {blog?.description}
              </Text>
            </View>
            {blog?.imageURL ? (
              <Image
                source={{
                  uri: blog.imageURL,
                }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 20,
                  marginTop: 20,
                }}
              />
            ) : (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                    blog?.photoRef || ""
                  }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 20,
                  marginTop: 20,
                }}
              />
            )}
            <View
              flexDirection="row"
              gap={20}
              alignItems="center"
              marginTop={10}
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
                  {blog.views || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
}
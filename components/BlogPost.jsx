import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Colors } from '../constants/Colors'
import moment from 'moment';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BlogPost({blog}) {

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
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
        <View flexDirection="row" gap={20} alignItems="center" marginTop={10}>
          <View flexDirection="row" gap={5} alignItems="center">
            <AntDesign name="like2" size={20} color="grey" />
            <Text
              style={{
                fontFamily: "open-sans",
                color: Colors.DARK_GREY,
                fontSize: 15,
              }}
            >
              {blog?.likes || 0}
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
  );
}
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { tabsStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import CreateModal from "../../components/Modals/Create/Create";
import { Colors } from "../../constants/Colors";
import { Avatar } from "react-native-paper";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BlogSummary from "../../components/BlogSummary";
import DestinationSummary from "../../components/DestinationSummary";
import BlogPost from "../../components/BlogPost";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
            height: 200,
            justifyContent: "center",
            // alignItems: "center",
            padding: "5%",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              marginHorizontal: "5%",
              marginVertical: 10,
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
              <Avatar.Text size={40} label={"Bi"} />
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
                  Vancouver, BC
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "open-sans-medium", fontSize: 20 }}>
              Welcome back, Bin Mai 👋
            </Text>
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

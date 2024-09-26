import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import PrimaryButton from "../../components/Primary/Button";
import { modalStyles } from "../../components/Modals/styles";
import { Colors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { primaryStyles } from "../../styles/primary";
import Toast from "react-native-toast-message";
import { showToast } from "../../utils/toast";
import { fetchData } from "../../utils/db";
import { where } from "firebase/firestore";
import NotFound from "../../components/NotFound";
import BlogPost from "../../components/BlogPost";
import { Divider } from "react-native-paper";

export default function SearchResult() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { keyword } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    fetchRelatedBlogs();
    setIsLoading(false);
  }, []);

  const fetchRelatedBlogs = async () => {
    try {
      const relatedBlogs = await fetchData(
        "Blogs",
        where("destination", "==", keyword)
      );

      setBlogs(relatedBlogs);
    } catch (error) {
      console.log("There was an error", error);
      showToast("error", "There was an error", error);
    }
  };

  return (
    <SafeAreaView style={{ flexDirection: "column" }}>
      <View style={[modalStyles.closeButtonContainer]}>
        <PrimaryButton
          onPress={() => router.back()}
          style={{ borderRadius: "50%", backgroundColor: "transparent" }}
        >
          <Feather name="arrow-left" size={30} color={Colors.DARK_GREY} />
        </PrimaryButton>
      </View>
      <Text
        style={[
          primaryStyles.subtitle,
          {
            marginTop: 0,
            marginHorizontal: 20,
            color: Colors.BLACK,
            textAlign: "left",
            marginVertical: 10,
          },
        ]}
      >
        Search for {keyword}
      </Text>

      {/* Blogs related to destination */}
      <ScrollView style={{ height: "100%", marginHorizontal: 20 }}>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "column", marginBottom: 10, gap: 10 }}
              >
                <BlogPost blog={blog} />
                <Divider />
              </View>
            );
          })
        ) : (
          <NotFound text="No Blogs Found" />
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

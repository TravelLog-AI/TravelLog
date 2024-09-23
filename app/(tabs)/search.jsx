import { View, Text, SafeAreaView, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../../components/Primary/Button';
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AutoComplete from '../../components/AutoComplete';
import { fetchData } from '../../utils/db';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';

const durationTime = 200;
export default function Search() {
  const [selectedOption, setSelectedOption] = useState('City');
  const [userList, setUserList] = useState([]);

  const router = useRouter();
  
  // Animation
  const cityOpacity = useRef(new Animated.Value(selectedOption === 'City' ? 1 : 0)).current;
  const cityTranslateY = useRef(new Animated.Value(selectedOption === 'City' ? 0 : -100)).current;
  const profileOpacity = useRef(new Animated.Value(selectedOption === 'Profile' ? 1 : 0)).current;
  const profileTranslateY = useRef(new Animated.Value(selectedOption === 'Profile' ? 0 : -100)).current;

  useEffect(() => {
    if (userList.length === 0) {
      fetchUsers();
    }
  }, []);

  // Animation Change
  useEffect(() => {
    const animations = [];
    if (selectedOption === 'City') {
      animations.push(
        Animated.timing(cityOpacity, {
          toValue: 1,
          duration: durationTime,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityTranslateY, {
          toValue: 0,
          duration: durationTime,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileOpacity, {
          toValue: 0,
          duration: durationTime,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileTranslateY, {
          toValue: -100,
          duration: durationTime,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        })
      );
    } else if (selectedOption === 'Profile') {
      animations.push(
        Animated.timing(profileOpacity, {
          toValue: 1,
          duration: durationTime,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileTranslateY, {
          toValue: 0,
          duration: durationTime,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityOpacity, {
          toValue: 0,
          duration: durationTime,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityTranslateY, {
          toValue: -100,
          duration: durationTime,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, [selectedOption]);

  const fetchUsers = async () => {
    try {
      const users = await fetchData('Users');

      // const userNameList = users.map((user) => user.name);
      setUserList(users);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  }

  const handleOnSelect = (keyword) => {
    console.log(keyword);
    if (selectedOption === 'City') {
    router.push(`search/${keyword}`);
    } else if (selectedOption === 'Profile') {
      router.push(`view/profile/${keyword}`);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <PrimaryButton
          labelStyle={{
            fontSize: 15,
            color: selectedOption === "City" ? Colors.WHITE : Colors.PRIMARY,
          }}
          style={{
            padding: 10,
            borderRadius: 10,
            width: "40%",
            backgroundColor:
              selectedOption === "City" ? Colors.PRIMARY : Colors.WHITE,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
          }}
          onPress={() => setSelectedOption("City")}
        >
          City
        </PrimaryButton>
        <PrimaryButton
          labelStyle={{
            fontSize: 15,
            color: selectedOption === "Profile" ? Colors.WHITE : Colors.PRIMARY,
          }}
          style={{
            padding: 10,
            borderRadius: 10,
            width: "40%",
            backgroundColor:
              selectedOption === "Profile" ? Colors.PRIMARY : Colors.WHITE,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
          }}
          onPress={() => setSelectedOption("Profile")}
        >
          Profile
        </PrimaryButton>
      </View>

      {/* Search Section */}
      {selectedOption === "City" ? (
        <Animated.View
          style={{
            opacity: cityOpacity,
            transform: [{ translateY: cityTranslateY }],
            paddingHorizontal: 10,
          }}
        >
          <View style={{ height: "100%" }}>
            <GooglePlacesAutocomplete
              placeholder="Search Place..."
              fetchDetails
              // onPress={() => {}}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
                types: "(cities)",
              }}
              styles={{
                textInputContainer: {
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: Colors.GREY,
                },
              }}
              onPress={(data) => {
                handleOnSelect(data.description);
              }}
            />
          </View>
        </Animated.View>
      ) : selectedOption === "Profile" ? (
        <Animated.View
          style={{
            opacity: profileOpacity,
            transform: [{ translateY: profileTranslateY }],
            paddingHorizontal: 10,
          }}
        >
          <AutoComplete
            findField="name"
            listToFind={userList}
            onPress={(item) => handleOnSelect(item.id)}
            renderItem={(item, index) => (
              <TouchableOpacity key={index} onPress={() => handleOnSelect(item.id)}>
                <View>
                  <Text
                    style={{
                      fontFamily: "open-sans",
                      fontSize: 15,
                      padding: 10,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Divider />
                </View>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
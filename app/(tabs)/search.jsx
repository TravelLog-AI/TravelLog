import { View, Text, SafeAreaView, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../../components/Primary/Button';
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AutoComplete from '../../components/AutoComplete';
import { fetchData } from '../../utils/db';

export default function Search() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [userList, setUserList] = useState([]);
  
  // Animation
  const cityOpacity = useRef(new Animated.Value(selectedOption === 'City' ? 1 : 0)).current;
  const cityTranslateY = useRef(new Animated.Value(selectedOption === 'City' ? 0 : -100)).current;
  const profileOpacity = useRef(new Animated.Value(selectedOption === 'Profile' ? 1 : 0)).current;
  const profileTranslateY = useRef(new Animated.Value(selectedOption === 'Profile' ? 0 : -100)).current;

  useEffect(() => {
    fetchUsers();
  }, []);

  // Animation Change
  useEffect(() => {
    const animations = [];
    if (selectedOption === 'City') {
      animations.push(
        Animated.timing(cityOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileOpacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileTranslateY, {
          toValue: -100,
          duration: 300,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        })
      );
    } else if (selectedOption === 'Profile') {
      animations.push(
        Animated.timing(profileOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(profileTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityOpacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(cityTranslateY, {
          toValue: -100,
          duration: 300,
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

      const userNameList = users.map((user) => user.name);
      setUserList(userNameList);
    } catch (error) {
      console.log('There was an error: ', error);
      showToast('error', 'There was an error', error);
    }
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        <PrimaryButton
          labelStyle={{ fontSize: 15 }}
          style={{ padding: 10, borderRadius: 10, width: "40%" }}
          onPress={() => setSelectedOption("City")}
        >
          City
        </PrimaryButton>
        <PrimaryButton
          labelStyle={{ fontSize: 15 }}
          style={{
            padding: 10,
            borderRadius: 10,
            width: "40%",
            backgroundColor: Colors.SECONDARY,
          }}
          onPress={() => setSelectedOption("Profile")}
        >
          Profile
        </PrimaryButton>
      </View>

      {/* Search Section */}
      {selectedOption === "City" ? (
        <Animated.View style={{opacity: cityOpacity, transform: [{translateY: cityTranslateY}]}}>
          <View style={{ height: "100%" }}>
            <GooglePlacesAutocomplete
              placeholder="Search Place..."
              fetchDetails
              onPress={() => {}}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
              }}
              styles={{
                textInputContainer: {
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: "5%",
                },
              }}
            />
          </View>
        </Animated.View>
      ) : selectedOption === "Profile" ? (
        <Animated.View style={{opacity: profileOpacity, transform: [{translateY: profileTranslateY}]}}>
          <AutoComplete
            keywords={searchKeywords}
            setKeywords={setSearchKeywords}
            listToFind={userList}
          />
        </Animated.View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
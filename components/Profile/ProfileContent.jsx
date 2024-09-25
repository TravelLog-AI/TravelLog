import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper';
import PrimaryButton from '../Primary/Button';
import { profileTabs } from '../../constants/arrays';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import MyTrips from './MyTrips';
import MyBlogs from './MyBlogs';
import BackButton from '../BackButton';
import { useRouter } from 'expo-router';

export default function ProfileContent({
    userData,
    onClick,
    userTrips,
    userBlogs,
    isOwner
}) {
  const [currentTab, setCurrentTab] = useState(profileTabs[0].id);
  const router = useRouter();

  return (
    <>
      <SafeAreaView
        style={{
          dipslay: "flex",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.WHITE,
        }}
      >
        {!isOwner && <BackButton onPress={() => router.back()} />}
        <Avatar.Text size={100} label={userData?.name?.slice(0, 1)} />
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {userData?.name}
        </Text>
        {isOwner && (
          <PrimaryButton
            labelStyle={{ fontSize: 15 }}
            style={{ padding: 10, borderRadius: 10 }}
            onPress={onClick}
          >
            Edit Profile
          </PrimaryButton>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "60%",
            marginVertical: 20,
          }}
        >
          {profileTabs.map((tab, index) => {
            let icon;
            if (currentTab === tab.id) {
              icon = profileTabs[index].getIcon(Colors.PRIMARY);
            } else {
              icon = profileTabs[index].getIcon(Colors.DARK_GREY);
            }

            return (
              <TouchableOpacity
                onPress={() => setCurrentTab(tab.id)}
                key={index}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {icon}
                  <Text
                    style={{
                      fontFamily: "open-sans-medium",
                      fontSize: 15,
                      color:
                        currentTab === tab.id
                          ? Colors.PRIMARY
                          : Colors.DARK_GREY,
                    }}
                  >
                    {tab.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>

      <View
        style={{ backgroundColor: Colors.WHITE, marginTop: 20, padding: 10 }}
      >
        {currentTab === profileTabs[0].id ? (
          <MyTrips trips={userTrips} isOwner={isOwner} />
        ) : (
          <MyBlogs blogs={userBlogs} />
        )}
      </View>
    </>
  );
}
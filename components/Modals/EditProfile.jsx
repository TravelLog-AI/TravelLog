import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { modalStyles } from './styles';
import PrimaryButton from '../Primary/Button';
import { Colors } from '../../constants/Colors';
import { Entypo, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Avatar, Divider, TextInput } from 'react-native-paper';
import SelectPlace from './Create/SelectPlace';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../context/UserContext';
import { showToast } from '../../utils/toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { updateSingleDoc } from '../../utils/db';

export default function EditProfile({
    open,
    onClose
}) {
    const [address, setAddress] = useState();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isOpenSelectPlace, setIsOpenSelectPlace] = useState(false);
    const [user, setUser] = useState({});
    
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        if (userData) {
            setUser(userData);
            setAddress(userData.address);
        }
    }, [userData]);

    const handleSaveData = async () => {
      if (
        user?.name === userData?.name &&
        user?.email === userData?.email &&
        address?.name === userData?.name
      ) {
        showToast("warning", "No updated data");
        return;
      }
      try {
        setIsUpdating(true);

        const updatedData = {
            name: user.name,
            email: user.email,
            address
        }
        // await updateSingleDoc('Users', userData.docId, updatedData);
        await updateDoc(doc(db, "Users", userData.docId), {
          name: user.name,
          email: user.email,
          address: {
            coordinates: address?.coordinates,
            name: address?.name
          },
        });

        onClose();
        showToast('success', 'Update Successfully', '');
        setUserData({
            ...userData,
            ...updatedData
        });

        setIsUpdating(false);
      } catch (error) {
        console.log("There was an error: ", error);
        showToast("error", "There was an error", error);
        setIsUpdating(false);
      }
    }

  return (
    <View>
      <Modal isVisible={open} style={[modalStyles.container, {zIndex: 1}]}>
        <SelectPlace
          open={isOpenSelectPlace}
          onClose={() => setIsOpenSelectPlace(false)}
          setAddress={setAddress}
        />
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Heading */}
          <View style={[modalStyles.closeButtonContainer, { flex: 1 }]}>
            <PrimaryButton
              onPress={onClose}
              style={{ backgroundColor: Colors.WHITE, borderRadius: "50%" }}
            >
              <Feather name="arrow-left" size={30} color={Colors.DARK_GREY} />
            </PrimaryButton>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: "open-sans-medium",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Profile
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </SafeAreaView>
        <Divider />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Avatar.Text size={100} label={user?.name?.slice(0,2) || ''} />
        </View>

        {/* Inputs Group */}
        <View style={{ gap: 10 }}>
          <TextInput
            placeholder="Name"
            left={
              <TextInput.Icon
                icon={() => (
                  <FontAwesome5 name="pen" size={15} color={Colors.DARK_GREY} />
                )}
              />
            }
            value={user?.name || ""}
            onChangeText={(text) => setUser({ ...user, name: text })}
            style={{
              marginTop: 10,
              backgroundColor: Colors.WHITE,
            }}
          />

          <TextInput
            placeholder="Email"
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name="email"
                    size={15}
                    color={Colors.DARK_GREY}
                  />
                )}
              />
            }
            value={user?.email || ""}
            onChangeText={(text) => setUser({ ...user, email: text })}
            style={{
              marginTop: 10,
              backgroundColor: Colors.WHITE,
            }}
          />

          <TextInput
            placeholder="Where"
            left={
              <TextInput.Icon
                icon={() => (
                  <FontAwesome6
                    name="map-location-dot"
                    size={15}
                    color={Colors.DARK_GREY}
                  />
                )}
              />
            }
            onPress={() => setIsOpenSelectPlace(true)}
            value={address?.name || user?.address?.name}
            style={{
              marginTop: 10,
              backgroundColor: Colors.WHITE,
            }}
          />
        </View>

        <PrimaryButton
          loading={isUpdating}
          onPress={handleSaveData}
          labelStyle={{ fontSize: 20 }}
          style={{ padding: 10, marginTop: 20, width: "100%" }}
        >
          Save
        </PrimaryButton>
      </Modal>
    </View>
  );
}
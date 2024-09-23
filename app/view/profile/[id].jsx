import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchData, fetchDoc } from '../../../utils/db';
import { where } from 'firebase/firestore';
import ProfileContent from '../../../components/Profile/ProfileContent';
import { showToast } from '../../../utils/toast';
import PrimaryButton from '../../../components/Primary/Button';
import { Colors } from '../../../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { modalStyles } from '../../../components/Modals/styles';

export default function ViewProfile() {
    const [userData, setUserData] = useState();
    const { id } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {        
                const fetchedUser = await fetchDoc('Users', id);

                const fetchedBlogs = await fetchData('Blogs', where('userId', '==', id));

                const fetchedTrips = await fetchData('Trips', where('userId', '==', id));
                setUserData({
                  user: fetchedUser.docData,
                  blogs: fetchedBlogs,
                  trips: fetchedTrips,
                });
            } catch (error) {
                console.log('There was an error: ', error);
                showToast('error', 'There was an error', error);
            }
        }    
        fetchUser();
    }, [id]);

  return (
    <ScrollView>
      <ProfileContent
        userData={userData?.user || {}}
        userBlogs={userData?.blogs || []}
        userTrips={userData?.trips || []}
      />
    </ScrollView>
  );
}

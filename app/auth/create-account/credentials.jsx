import { Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors'
import { Divider, TextInput } from 'react-native-paper'
import { authStyles } from '../styles';
import PrimaryButton from '../../../components/Primary/Button';
import { primaryStyles } from '../../../styles/primary';
import { useRouter } from 'expo-router';

export default function Credentials() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  return (
    <ScrollView style={primaryStyles.screenBackground}>
      {/* Missing Logo */}
      <Text
        style={[
          primaryStyles.heading,
          { textAlign: "left" },
        ]}
      >
        Create New Account
      </Text>

      {/* Inputs Group */}
      <View style={authStyles.inputContainer}>
        <Text style={{color: Colors.PRIMARY}}>Email</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
        />
      </View>
      <View style={authStyles.inputContainer}>
        <Text style={{color: Colors.PRIMARY}}>Password</Text>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined" 
        />
      </View>

      {/* Buttons Group */}
      <View style={authStyles.buttonContainer}>
        <PrimaryButton mode="contained" onPress={() => router.push('auth/create-account/name')}>Continue</PrimaryButton>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider style={{width: '40%'}} />
          <Text style={{marginHorizontal: 10, fontSize: 20, fontFamily: 'open-sans-light' }}>or</Text>
          <Divider style={{width: '40%'}} />
        </View>
        {/* <PrimaryButton
          icon='google'
          mode="outlined"
          labelStyle={{ color: Colors.PRIMARY }}
        >
          Sign Up With Google
        </PrimaryButton> */}
        <PrimaryButton
          mode="contained"
          style={{backgroundColor: Colors.SECONDARY}}
        >
          Sign In
        </PrimaryButton>
      </View>
    </ScrollView>
  )
}
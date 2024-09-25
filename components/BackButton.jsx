import { SafeAreaView } from 'react-native'
import React from 'react'
import { modalStyles } from './Modals/styles';
import PrimaryButton from './Primary/Button';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default function BackButton({onPress}) {
  return (
    <SafeAreaView style={[modalStyles.closeButtonContainer]}>
      <PrimaryButton
        onPress={onPress}
        style={{ borderRadius: "50%", backgroundColor: "transparent" }}
      >
        <Feather name="arrow-left" size={30} color={Colors.DARK_GREY} />
      </PrimaryButton>
    </SafeAreaView>
  );
}
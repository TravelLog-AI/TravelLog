import { View, Text } from 'react-native'
import React from 'react'
import PrimaryButton from './Primary/Button';
import { modalStyles } from './Modals/styles';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default function CloseModalButton({containerStyle, style, size = 30, onPress}) {
  return (
    <View style={[modalStyles.closeButtonContainer, containerStyle]}>
      <PrimaryButton
        onPress={onPress}
        style={{ backgroundColor: Colors.WHITE, borderRadius: "50%", ...style }}
      >
        <Feather name="arrow-left" size={size} color={Colors.DARK_GREY} />
      </PrimaryButton>
    </View>
  );
}
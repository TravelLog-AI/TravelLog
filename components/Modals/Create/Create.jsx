import { View, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../../constants/Colors";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import PrimaryButton from "../../Primary/Button";
import CreateTabs, { TABS } from "../../Create/Tabs";
import CreateTrip from "../../Create/CreateTrip";
import CreateBlog from "../../Create/CreateBlog";
import { createStyles } from "../../Create/styles";
import Toast from "react-native-toast-message";
import { showToast } from "../../../utils/toast";
import BackButton from '../../BackButton';

export default function CreateModal({ open, onClose }) {
  const [currentTab, setCurrentTab] = useState(TABS.TRIP);

  return (
    <View>
      <Modal
        keyboardShouldPersistTaps="always"
        isVisible={open}
        style={[createStyles.container, { zIndex: 0 }]}
      >
        {/* <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <PrimaryButton
            onPress={() => {
              onClose();
              console.log("On Close");
            }}
            style={{ backgroundColor: Colors.WHITE, borderRadius: "50%" }}
          >
            <Entypo name="cross" size={30} color={Colors.GREY} />
          </PrimaryButton>
        </View> */}
        <BackButton onPress={onClose} />

        {/* Tabs */}
        <CreateTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {currentTab === TABS.TRIP ? (
          <CreateTrip onClose={onClose} />
        ) : (
          <CreateBlog onClose={onClose} showToast={showToast} />
        )}
        <Toast position="bottom" swipeable />
      </Modal>
    </View>
  );
}

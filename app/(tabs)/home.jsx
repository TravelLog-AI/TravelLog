import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { tabsStyles } from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CreateModal, { createStyles } from "../../components/Modals/Create";
import { Colors } from "../../constants/Colors";
import { Dialog, Modal, Portal } from "react-native-paper";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={tabsStyles.screenContainer}>
      <CreateModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)}/>
      <TouchableOpacity
        style={tabsStyles.createTripButton}
        onPress={() => setIsCreateOpen(true)}
      >
        <Ionicons name="add-circle" size={70} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </ScrollView>
  );
}

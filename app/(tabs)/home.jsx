import {
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { tabsStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import CreateModal from "../../components/Modals/Create/Create";
import { Colors } from "../../constants/Colors";

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={tabsStyles.screenContainer}>
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

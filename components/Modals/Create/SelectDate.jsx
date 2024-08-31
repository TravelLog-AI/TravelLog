import { View, Text } from "react-native";
import React from "react";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../../../constants/Colors";
import Modal from "react-native-modal";
import { createStyles } from "../../Create/styles";
import PrimaryButton from "../../Primary/Button";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { modalStyles } from "../styles";

export default function SelectDate({
  open,
  onClose,
  setStartDate,
  setEndDate,
}) {
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    }

    if (type === "END_DATE") {
      setEndDate(moment(date));
    }
  };

  return (
    <View>
      <Modal isVisible={open} style={createStyles.container}>
        <View
          style={modalStyles.closeButtonContainer}
        >
          <PrimaryButton
            onPress={onClose}
            style={{ backgroundColor: Colors.WHITE, borderRadius: "50%" }}
          >
            <Entypo name="cross" size={40} color={Colors.GREY} />
          </PrimaryButton>
        </View>
        <View>
          <CalendarPicker
            onDateChange={onDateChange}
            allowRangeSelection
            minDate={new Date()}
            selectedRangeStyle={{
              backgroundColor: Colors.PRIMARY_BACKGROUND,
            }}
            selectedDayTextColor={Colors.PRIMARY}
          />
        </View>
        <PrimaryButton
          variant="outlined"
          style={{ padding: 10, borderRadius: 10, marginTop: 20 }}
          onPress={onClose}
        >
          Save
        </PrimaryButton>
      </Modal>
    </View>
  );
}

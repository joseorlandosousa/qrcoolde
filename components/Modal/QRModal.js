import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { color, spacing, radius, font } from "../../constants/Vars";
import { formatData } from "../../utils/dataType";
import t from '../../locales/i18n';
import Modal from "react-native-modal";


import QRItem from "../Item/QRItem";
import QRText from "../Text/QRText";



export default function QRModal(props) {
  const [dataType, setDataType] = useState({ title: null, type: null });

  useEffect(() => {
    (async () => {
      setData();
    })();
  }, [props.scanned]);

  const setData = () => {
    if(!!props.scanned.data){
      console.log(formatData(props.scanned.data))
      setDataType(formatData(props.scanned.data));
    }
  };
  return (
    <Modal
      isVisible={props.isModalVisible}
      onSwipeComplete={() => {
        props.onSwipeComplete();
      }}
      swipeDirection="down"
      style={styles.container}
      propagateSwipe
      customBackdrop={
        <TouchableWithoutFeedback onPress={props.onSwipeComplete}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
    >
      {!!dataType && 
        <View style={styles.modal}>
          <View style={styles.header}>
            <Feather
              name={dataType.icon}
              size={24}
              color={color.icon}
              style={{ marginRight: spacing.sm }}
            />
            <QRText type="title">{t(dataType.type)}</QRText>
          </View>
          <QRItem content={props.scanned.data} type={dataType.type}></QRItem>
        </View>
      }
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    margin: 0,
  },
  modal: {
    padding: spacing.lg,
    backgroundColor: "#fff",
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  header: {
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});

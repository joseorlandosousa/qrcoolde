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
import { formatData } from "../../utils/format";
import t from '../../locales/i18n';
import Modal from "react-native-modal";


import QRItem from "../Item/QRItem";
import QRText from "../Text/QRText";

import QRButton from "../Button/QRButton";



export default function QRModal(props) {
  const [dataContent, setDataContent] = useState({ title: null, type: null });

  useEffect(() => {
    (async () => {
      setData();
    })();
  }, [props.scanned]);

  const setData = () => {
    if(!!props.scanned.data){
      setDataContent(formatData(props.scanned.data));
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
      {!!dataContent && 
        <View style={styles.modal}>
          <View style={styles.header}>
            <Feather
              name={dataContent.icon}
              size={24}
              color={color.icon}
              style={{ marginRight: spacing.sm }}
            />
            <QRText type="title">{t(dataContent.type)}</QRText>
          </View>
          {!!dataContent.content && dataContent.content.map((item, index) => (
            <QRItem key={index} label={item.label} content={item.content} contentType={item.contentType}></QRItem>
          ))}

          <QRButton type={dataContent.type}></QRButton>
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
    paddingTop: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingBottom: spacing.sm,
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

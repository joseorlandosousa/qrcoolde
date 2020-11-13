import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { color, spacing, radius, font } from "../../constants/Vars";
import Modal from "react-native-modal";

import QRItem from "../Item/QRItem";

export default function QRModal(props) {
  const [dataType, setDataType] = useState({title: null, type: null});

  useEffect(() => {
    (async () => {
      formatTitle();
    })();
  }, [props.scanned]);

  const formatTitle = () => {
      
    let type;
    if(!!props.scanned.data){
      
        if(props.scanned.data.indexOf('http') != -1){
            type = {title: "URL", type: 'url'}
        }
        else if(props.scanned.data.indexOf('tel:') != -1){
            type = {title: "Telefone", type: 'tel'}
        }
        else {
            type = {title: "Texto", type: 'text'}
        }

        setDataType(type);
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
      <View style={styles.modal}>
        <Text style={styles.title}>{dataType.title}</Text>
        <QRItem content={props.scanned.data}></QRItem>
      </View>
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
  title: {
    color: color.text,
    fontSize: font.xl,
    fontWeight: "bold",
  },
});

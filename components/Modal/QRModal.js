import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Clipboard,
  ToastAndroid
} from "react-native";
import * as Linking from 'expo-linking';
import * as Contacts from 'expo-contacts';
import { Feather } from "@expo/vector-icons";

import { color, spacing, radius, font } from "../../constants/Vars";
import { formatData } from "../../utils/format";
import t from '../../locales/i18n';
import Modal from "react-native-modal";


import QRItem from "../Item/QRItem";
import QRText from "../Text/QRText";

import QRButton from "../Button/QRButton";

const windowWidth = Dimensions.get('window').width;

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

  const copyToClipboard = (content) => {
    Clipboard.setString(content);
    ToastAndroid.show(`${t('copied')}!`, ToastAndroid.SHORT);
  };

  const handleClick = async (data) => {
    switch (data.type) {
      case "url":
        Linking.openURL(data.content[0].content);
        break;

      case "phone":
        Linking.openURL(data.content[0].content);
        break;

      case "sms":
        Linking.openURL('sms:' + data.content[0].content + '?body=' + data.content[1].content);
        break;
  
      case "whatsapp":
        Linking.openURL('whatsapp://send?phone=' + data.content[0].content + '&text=' + data.content[1].content);
        break;
        
      case "location":
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.content[0].content},${data.content[1].content}`);
          break;
      
      case "wifi":
        copyToClipboard(data.content[1].content);
        break;

      case "email":
        Linking.openURL(`mailto:${data.content[0].content}?subject=${data.content[1].content}&body=${data.content[2].content}`);
        break;

      case "contact":
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const contact = {
            [Contacts.Fields.Name]: data.content[0].content,
            [Contacts.Fields.Emails]: data.content[1].content,
            [Contacts.Fields.PhoneNumbers]: data.content[2].content,
            [Contacts.Fields.Company]: data.content[3].content,
            [Contacts.Fields.Addresses]: data.content[4].content,
            [Contacts.Fields.UrlAddresses]: data.content[5].content,
          };
          const contactId = await Contacts.addContactAsync(contact);
        }
        break;
    
      default:
        copyToClipboard(data.content[0].content);
        break;
    }
  }

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
          <View style={styles.mark}></View>
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

          <QRButton type={dataContent.type} onPress={()=> handleClick(dataContent)}></QRButton>
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
  mark: {
    height: 5,
    width: 50,
    backgroundColor: color.white,
    borderRadius: radius.md,
    position: 'absolute',
    top: -10,
    left: (windowWidth/2) - 25,
    opacity:.8
  }
});

import React from "react";
import { TouchableOpacity, View, StyleSheet, Clipboard, ToastAndroid, Vibration } from "react-native";
// TODO: Update to '@react-native-community/clipboard'
// import Clipboard from '@react-native-community/clipboard';
import { Feather } from "@expo/vector-icons";

import { color, spacing, radius, font } from "../../constants/Vars";
import QRText from "../Text/QRText";
import t from '../../locales/i18n';


export default function QRItem(props) {

  const copyToClipboard = () => {
    Clipboard.setString(props.content);
    Vibration.vibrate(50);
    ToastAndroid.show(`${t('copied')}!`, ToastAndroid.SHORT);
  };
 

  return (
    <TouchableOpacity style={styles.container} onPress={copyToClipboard}>
      {!!props.label && 
        <QRText type="label" style={{ paddingRight: spacing.sm }}>{t(props.label)}: </QRText>
      }
      <View style={{flex: 1,}}>
        <QRText contentType={props.contentType}>{props.content}</QRText>
      </View>

      <Feather
        name="copy"
        size={24}
        color={color.primary}
        style={styles.copyButton}
      />


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: color.item_bg,
    marginBottom: spacing.sm
  },
  copyButton: {
    position: 'absolute',
    right: 12,
    bottom: spacing.md,
    zIndex: 10
  }
});

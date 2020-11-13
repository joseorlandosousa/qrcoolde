import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { color, spacing, radius, font } from "../../constants/Vars";
import QRText from "../Text/QRText";

export default function QRItem(props) {
  return (
    <View style={styles.container}>
        <QRText type="label">Label:</QRText>
        <QRText>{props.content}</QRText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: color.item_bg
  },
});

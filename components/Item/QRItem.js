import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { color, spacing, radius, font } from "../../constants/Vars";

export default function QRItem(props) {
  return (
    <View style={styles.container}>
        <Text>{props.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: color.item_bg
  },
});

import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { color, spacing, radius, font } from "../../constants/Vars";
import { AppLoading } from "expo";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

export default function QRText(props) {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Text style={!props.type ? styles.text : styles[props.type]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: color.text,
    fontSize: font.xl,
    fontFamily: "Nunito_700Bold",
  },
  label: {
    color: color.text,
    fontSize: font.md,
    fontFamily: "Nunito_600SemiBold",
  },
  text: {
    color: color.text,
    fontSize: font.md,
    fontFamily: "Nunito_400Regular",
  },
});

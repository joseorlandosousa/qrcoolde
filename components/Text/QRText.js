import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { color, spacing, radius, font } from "../../constants/Vars";
import { AppLoading } from "expo";
import { formatNumber } from "libphonenumber-js";

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


  const formatContent = (content) => {
    switch (props.contentType) {
      case "phone":
        return !!formatNumber(content, 'International') ? formatNumber(content, 'International') : content;   
      default:
        return content;
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Text style={!props.type ? styles.text : styles[props.type]}>
      {formatContent(props.children)}
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

  btn: {
    color: color.white,
    fontSize: font.lg,
    fontFamily: "Nunito_600SemiBold",
  },

  btn_inverse: {
    color: color.primary,
    fontSize: font.lg,
    fontFamily: "Nunito_600SemiBold",
  },

  display: {
    color: color.white,
    fontSize: font.xxl,
    lineHeight: font.xxl,
    fontFamily: "Nunito_700Bold",
    paddingTop: spacing.lg
  },
  lead: {
    color: color.white,
    fontSize: font.xl,
    fontFamily: "Nunito_400Regular",
  },
});

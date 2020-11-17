import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { color, spacing, radius} from "../../constants/Vars";
import QRText from "../Text/QRText";
import t from '../../locales/i18n';


export default function QRButton(props) {


  return (
    <TouchableOpacity>
      <LinearGradient
        // Button Linear Gradient
        colors={[color.primary, color.secondary]}
        style={styles.container}
      >
        <QRText type="btn">{t('btn.' + props.type)}</QRText>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.xxl,
    backgroundColor: color.primary,
    marginBottom: spacing.sm,
    elevation: 2
  },

});

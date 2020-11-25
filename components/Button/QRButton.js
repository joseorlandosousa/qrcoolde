import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { color, spacing, radius} from "../../constants/Vars";
import QRText from "../Text/QRText";
import t from '../../locales/i18n';


export default function QRButton(props) {


  return (
    <TouchableOpacity onPress={props.onPress}>
      {!props.variant &&
        <LinearGradient
          // Button Linear Gradient
          colors={[color.primary, color.secondary]}
          style={styles.container}
          start={{ x: 0.15, y: 0.9 }}
          end={{ x: 1, y: 0 }}
        >
          <QRText type="btn">{t('btn.' + props.type)}</QRText>
        </LinearGradient>
      }
      {props.variant == 'inverse' &&
        <View style={styles.container_inverse}>
           <QRText type="btn_inverse">{t('btn.' + props.type)}</QRText>
        </View>
      }
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

  container_inverse: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.xxl,
    backgroundColor: color.white,
    marginBottom: spacing.sm,
    elevation: 3,
  },

});

import React from "react";
import { Text, View, StyleSheet, Vibration, ActivityIndicator } from "react-native";
import { color, spacing } from "../../constants/Vars";
import QRText from "../Text/QRText";
import t from '../../locales/i18n';
import QRButton from "../Button/QRButton";
import { Feather } from "@expo/vector-icons";


export default function QRCamNoAccess(props) {

    return (
        <View style={styles.container}>
            <Feather
              name="camera-off"
              size={86}
              color={color.white}
              style={{ marginRight: spacing.sm }}
            />
            <QRText type="display" >{t('camPermission.title')}</QRText>
            <QRText type="lead">{t('camPermission.description')}</QRText>

            <View style={{marginTop: spacing.xl, }}>
                <QRButton variant="inverse" type="camPermission" onPress={props.requestPermission}></QRButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:spacing.xl,
        flex: 1, 
        justifyContent: 'center', 
        //alignItems: 'flex-start', 
        backgroundColor: color.primary,
        flexGrow: 1
    },
  });
  
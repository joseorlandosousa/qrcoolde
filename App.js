import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Localization from 'expo-localization';
import QRCamera from './components/Camera/QRCamera';

export default function App() {
  return (
    <QRCamera style={StyleSheet.absoluteFillObject}></QRCamera>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

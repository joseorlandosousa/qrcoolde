import React, { useState, useEffect, useRef } from "react";
import { Image, View, StyleSheet, Vibration, ActivityIndicator, StatusBar, Dimensions, Animated} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';

import QRModal from '../Modal/QRModal';
import { color } from "../../constants/Vars";
import QRCamNoAccess from "../Pages/QRCamNoAccess";

const windowWidth = Dimensions.get('window').width - 180;

export default function QRCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  let cameraRef;
  let cameraRatio;
  let cameraSize;

  const PulseAnim = useRef(new Animated.Value(windowWidth)).current

  useEffect(() => {
    (async () => {
      handleRequestPermission();

      Animated.loop(
        Animated.sequence([
          Animated.timing(PulseAnim , {
            toValue: windowWidth - 20,
            duration: 1000,
            useNativeDriver: false
          }),
          Animated.timing(PulseAnim , {
            toValue: windowWidth,
            duration: 1000,
            useNativeDriver: false
          })
        ])
      ).start();
      
    })();
  }, []);

  const handleRequestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned({ type, data });
    Vibration.vibrate(100);
    toggleModal()
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSwipeComplete = () => {
    toggleModal();
    setScanned(false);
  }

  const getRatios = async () => {
    const ratios = await cameraRef.getSupportedRatiosAsync();
    cameraRatio = ratios[ratios.length -1];
    const sizes = await cameraRef.getAvailablePictureSizesAsync(cameraRatio);
    cameraSize = sizes[0]
    return ratios;
  };

  if (hasPermission === null) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary}}>
      <ActivityIndicator size="large" color={color.white} />
      {/* <Text >Requesting for camera permission</Text> */}
    </View>
    );
  }
  if (hasPermission === false) {
    return (
        <QRCamNoAccess requestPermission={handleRequestPermission}></QRCamNoAccess>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.primary}}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{flex: 1, alignItems: "center", justifyContent: "center"}}
        autoFocus={true}
        ref={ref => {
          cameraRef = ref;
        }}
        ratio={cameraRatio}
        cameraSize={cameraSize}
        whiteBalance="auto"
        zoom={0}
        
      >  
        
        <Animated.Image style={{width: PulseAnim, height: PulseAnim, position: 'relative', opacity: !isModalVisible ? 1 : 0 }} source={require('../../assets/marker.png')}>
        </Animated.Image>
        
      </Camera>
      <QRModal
        isModalVisible={isModalVisible}
        onSwipeComplete={handleSwipeComplete}
        scanned={scanned}
      ></QRModal>
      <StatusBar style="dark" translucent={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Vibration,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  ToastAndroid
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

import QRModal from "../Modal/QRModal";
import { color } from "../../constants/Vars";
import QRCamNoAccess from "../Pages/QRCamNoAccess";
import t from '../../locales/i18n';

const { width } = Dimensions.get("window");
const windowWidth = width - 180;
const DESIRED_RATIO = "16:9";

export default function QRCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cameraRatio, setCameraRatio] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const PulseAnim = useRef(new Animated.Value(windowWidth)).current;

  useEffect(() => {
    (async () => {
      handleRequestPermission();
    })();
  }, []);

  /**
   * Asks for camera permission
   */
  const handleRequestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  /**
   * Animation for the QRCode Marker
   */
  const animateMarker = () => {
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
  }

  /**
   * QRCode Scaned
   */
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned({ type, data });
    Vibration.vibrate(100);
    toggleModal();
  };

  /**
   * Show and Hide the info modal
   */
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  /**
   * When swipe down on modal is complete
   */
  const handleSwipeComplete = () => {
    toggleModal();
    setScanned(false);
  };

  /**
   * Prepare camera ratio
   * https://github.com/react-native-camera/react-native-camera/issues/1280#issuecomment-368644836
   */
  const prepareRatio = async () => {
    if (Platform.OS === "android" && cameraRef) {
      const ratios = await cameraRef.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      setCameraRatio(ratio);
      
    }
  };
  
  /**
   * Runs when the camera is ready
   */
  const handleCameraReady = () => {
    prepareRatio();
    animateMarker();
  }

  /**
   * Change the flash mode on double tap
   */
  var lastTap = null;
  var tapInterval = null;
  const handleCameraPress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    // toggle FlashMode
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      if(tapInterval){
        clearTimeout(tapInterval);
      }
      setFlashMode(flashMode == Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off);
    } else {
      if(tapInterval){
        clearTimeout(tapInterval);
      }

      tapInterval = setTimeout(()=>{
        if(flashMode == Camera.Constants.FlashMode.off){
          ToastAndroid.show(t('flashMode.on'), ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(t('flashMode.off'), ToastAndroid.SHORT);
        }
      }, 500)
      
      lastTap = now;
    }
  }


  /**
   * Camera loading
   */
  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.primary,
        }}
      >
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );
  }

  /**
   * Camera without permission
   */
  if (hasPermission === false) {
    return (
      <QRCamNoAccess
        requestPermission={handleRequestPermission}
      ></QRCamNoAccess>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
        autoFocus={true}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        ratio={cameraRatio}
        whiteBalance="auto"
        zoom={0}
        onCameraReady={handleCameraReady}
        flashMode={flashMode}
      >
        <TouchableWithoutFeedback style={{ flex:1 }} onPress={handleCameraPress}>
          <Animated.Image
            style={{
              width: PulseAnim,
              height: PulseAnim,
              position: "absolute",
              opacity: !isModalVisible ? 1 : 0,
            }}
            source={require("../../assets/marker.png")}
          ></Animated.Image>

        </TouchableWithoutFeedback>
      </Camera>
      <QRModal
        isModalVisible={isModalVisible}
        onSwipeComplete={handleSwipeComplete}
        scanned={scanned}
      ></QRModal>
      <StatusBar translucent={true} backgroundColor={color.primary + "00"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

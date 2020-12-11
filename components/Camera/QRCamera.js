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
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

import QRModal from "../Modal/QRModal";
import { color } from "../../constants/Vars";
import QRCamNoAccess from "../Pages/QRCamNoAccess";

const { width } = Dimensions.get("window");
const windowWidth = width - 180;
const DESIRED_RATIO = "16:9";

export default function QRCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cameraRatio, setCameraRatio] = useState(null);

  let cameraRef;
  let cameraSize;

  const PulseAnim = useRef(new Animated.Value(windowWidth)).current;

  useEffect(() => {
    (async () => {
      handleRequestPermission();
    })();
  }, []);

  const handleRequestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

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
          cameraRef = ref;
        }}
        ratio={cameraRatio}
        cameraSize={cameraSize}
        whiteBalance="auto"
        zoom={0}
        onCameraReady={prepareRatio}
      >
        <Animated.Image
          style={{
            width: PulseAnim,
            height: PulseAnim,
            position: "relative",
            opacity: !isModalVisible ? 1 : 0,
          }}
          source={require("../../assets/marker.png")}
        ></Animated.Image>
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

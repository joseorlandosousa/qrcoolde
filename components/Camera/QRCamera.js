import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRModal from '../Modal/QRModal';

export default function QRCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned({ type, data });
    console.log(type, data)
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

  if (hasPermission === null) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text >Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{flex: 1}}
      />
      <QRModal
        isModalVisible={isModalVisible}
        onSwipeComplete={handleSwipeComplete}
        scanned={scanned}
      ></QRModal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

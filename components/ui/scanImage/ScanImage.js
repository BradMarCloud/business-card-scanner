import { useState } from "react";
import { View, Button, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function ScanImage() {
  const navigation = useNavigation();
  const [imageInformation, setImageInformation] = useState(null);

  //Permissions
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermissions = async () => {
    console.log(status);
    const permissionResponse = await requestPermission();
    console.log(status);

    if (status.status === "granted") {
      return true;
    }
    return false;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const asset = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.85,
      base64: true,
    });

    if (asset.assets.length <= 0) {
      console.warn("No image taken");
      return;
    }

    const imageTaken = asset.assets[0];

    if (imageTaken.canceled === true) {
      return;
    }

    if (!imageTaken.uri) {
      console.warn("No image has been taken, try again");
      return;
    }

    setImageInformation(imageTaken);

    // console.log(imageTaken);
    navigation.navigate("ProspectInformation", { imageInformation: imageTaken });
  };

  return (
    <View>
      <Button title="Scan Prospect" onPress={takeImage} />
    </View>
  );
}

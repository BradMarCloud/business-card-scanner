import { useState } from "react";
import { View, Text, Image } from "react-native";
import getInformation from "../components/util/abbyy/getInformation";
import postImage from "../components/util/abbyy/postImage";
import downloadFile from "../components/util/helpers/downloadFile";

export default function ProspectInformation({ navigation, route }) {
  const { imageInformation } = route.params;

  if (imageInformation !== null) {
    abbyyHandler();
  }

  async function abbyyHandler() {
    const taskId = await postImage(imageInformation);
    console.log(taskId);

    const abbyyResponse = await getInformation(taskId);
    console.log(abbyyResponse);

    const downloadedFile = await downloadFile(abbyyResponse.$.resultUrl);
  }

  return (
    <View>
      <Text>Hello welcome to the ProspectInformation Screen</Text>
      <Image style={{ width: 300, height: 300 }} source={{ uri: imageInformation.uri }} />
    </View>
  );
}

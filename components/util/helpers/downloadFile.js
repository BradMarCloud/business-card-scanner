import * as FileSystem from "expo-file-system";

export default async function downloadFile(uri) {
  const documentsDir = FileSystem.documentDirectory;
  console.log("Documents Directory: " + documentsDir);

  try {
    // Do not download directly to the documents dir, will cause error for async storage
    const downloadedFile = await FileSystem.downloadAsync(uri, documentsDir + "file/");

    console.log(downloadFile.toString());
    return downloadedFile;
  } catch (error) {
    console.error(error);
    return error;
  }
}

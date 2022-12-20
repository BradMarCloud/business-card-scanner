import axios from "axios";

export default async function postImage(imageInformation) {
  //   console.log(imageInformation.uri);

  const imageName = imageInformation.uri.split("/").pop();
  //   console.log("Image Name = " + imageName);

  let form = new FormData();
  form.append("exportFormat", "xml");
  form.append("image", {
    uri: imageInformation.uri,
    type: "image/jpeg",
    name: imageName,
  });

  let formData = axios.toFormData({
    exportFormat: "xml",
    image: {
      uri: imageInformation.uri,
      type: "image/jpeg",
      name: imageName,
    },
  });

  //   console.log("Form Data");
  //   console.log(formData);

  const imagePostConfig = {
    method: "post",
    url: "https://cloud.ocrsdk.com/v2/processBusinessCard",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Basic MjdiYmNlNzUtYWU4YS00MDViLWFjOWEtZjRiNTFhZGYzMWIzCjpQKzZsdmJCd3pBVDR5cThnZ0pZM1dwRDk=",
    },
    data: form,
  };

  try {
    const abbyyResponse = await axios(imagePostConfig);

    if (abbyyResponse.status === 200) {
      return abbyyResponse.data.taskId;
    }
  } catch (error) {
    console.error(error.response);
    return error;
  }

  return;
}

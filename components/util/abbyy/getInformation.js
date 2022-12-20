import axios from "axios";
import xml2js from "../helpers/xml2js";

export default async function getInformation(taskId) {
  function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  const abbyyInformationConfig = {
    method: "get",
    url: `https://cloud.ocrsdk.com/getTaskStatus?taskId=${taskId}`,
    headers: {
      Authorization: "Basic MjdiYmNlNzUtYWU4YS00MDViLWFjOWEtZjRiNTFhZGYzMWIzCjpQKzZsdmJCd3pBVDR5cThnZ0pZM1dwRDk=",
    },
  };

  async function makeCall() {
    try {
      const abbyyInformation = await axios(abbyyInformationConfig);
      const js = await xml2js(abbyyInformation.data);
      return js;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  let prospectInformation = await makeCall();
  console.log(prospectInformation.response.task[0].$.status);

  let count = 10;
  let time = 500;
  while (prospectInformation.response.task[0].$.status !== "Completed" && count > 0) {
    count--;
    sleep(time);
    time += 500;
    prospectInformation = await makeCall();
  }

  if (count === 0 && prospectInformation.response.task[0].$.status !== "Completed") {
    console.error("Error fetching data");
    return;
  }

  count = 10;

  console.log(prospectInformation.response.task[0].$.status);
  return prospectInformation.response.task[0];
}

import axios from "axios";

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
      return abbyyInformation;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  let prospectInformation = await makeCall();
  console.log(prospectInformation);

  let count = 10;
  let time = 500;
  while (prospectInformation.response.task[0].$.status !== "Completed" && count > 0) {
    count--; // Must include this to prevent an infinite loop
    sleep(time); // gives time for the async in the fnct to complete
    time += 500;
    // console.log("repeat");
    prospectInformation = await makeCall();
  }

  if (count === 0 && prospectInformation.response.task[0].$.status !== "Completed") {
    console.error("Error fetching data");
    return;
  }

  console.log(prospectInformation);
  return prospectInformation;
}

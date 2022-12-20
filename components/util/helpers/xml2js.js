var parseString = require("react-native-xml2js").parseString;

export default async function xml2js(xml) {
  let global;
  parseString(xml, (error, result) => {
    if (error) {
      console.error(error);
      global = error;
      return global;
    } else {
      global = result;
      return global;
    }
  });
  return global;
}

import { View, Text } from "react-native";

import { useReactiveVar } from "@apollo/client";
import { userDetailsVar, accessTokenVar } from "../views/Login";

export default function Scan({ navigation }) {
  const USER_DETAILS = useReactiveVar(userDetailsVar);

  // console.log(USER_DETAILS);

  return (
    <View>
      <Text>Welcome to the scan screen</Text>
    </View>
  );
}

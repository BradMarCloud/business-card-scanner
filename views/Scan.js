import { View, Text } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { userDetailsVar, accessTokenVar } from "../views/Login";
import { useEffect } from "react";
import { getToken, loggedIn } from "../components/graphql/util/auth";
import ScanImage from "../components/ui/scanImage/ScanImage";

export default function Scan({ navigation }) {
  const isFocused = navigation.isFocused();

  const USER_DETAILS = useReactiveVar(userDetailsVar);

  useEffect(() => {
    async function stillLoggedIn() {
      let token = await getToken();
      console.log("Token = " + token);

      const isLoggedIn = await loggedIn();
      if (isLoggedIn) {
        console.log("Login Expiry");
        navigation.replace("Login");
        await auth.logout();
      }
      console.log("Still Logged In");
    }
    stillLoggedIn();
  }, [isFocused]);

  // console.log(USER_DETAILS);

  return (
    <View>
      <Text>Welcome to the scan screen</Text>
      <ScanImage />
    </View>
  );
}

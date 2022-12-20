import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { useMutation, useQuery, makeVar, useReactiveVar } from "@apollo/client";
import { auth } from "../components/graphql/util/auth";
import { MUTATION_Login_User } from "../components/graphql/mutations/mutations";
import { QUERY_CheckUser } from "../components/graphql/queries/queries";
import AuthBrowser from "../components/ui/modals/AuthBrowser";
import qs from "qs";
import axios from "axios";

export const userDetailsVar = makeVar({});
export const accessTokenVar = makeVar("");

export default function Login({ navigation }) {
  const [userDetails, setUserDetails] = useState({});
  // MODAL STATE
  const [authBrowserVisible, setAuthBrowserVisible] = useState(false);

  const [login] = useMutation(MUTATION_Login_User);

  const {
    data: userData,
    error: userError,
    refetch,
  } = useQuery(QUERY_CheckUser, {
    variables: {
      username: userDetails.username,
      domainName: userDetails.domain,
    },
    enabled: false,
  });

  async function loginHandler() {
    refetch({ username: userDetails.username, domainName: userDetails.domain });

    if (userError) {
      console.error(userError);
      return;
    }

    if (userData) {
      // console.log(userData);
    }
    setAuthBrowserVisible(true);
  }

  async function continueFunction() {
    const { data: loginData } = await login({
      variables: {
        username: userDetails.username,
        domainName: userDetails.domain,
      },
    }).catch((e) => {
      console.error(e);
      return;
    });

    // console.log(loginData);

    if (!loginData.user.user.code) {
      console.error("No user found");
      return;
    }

    userDetailsVar(loginData.user);
    await auth.login(loginData.user.token);

    async function userMatch(accessToken, id) {
      let userMatchConfig = {
        method: "get",
        url: id,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const idUser = await axios(userMatchConfig).catch((e) =>
        console.error(e)
      );
      console.log(idUser.data);

      if (idUser.data.username === userDetails.username) {
        return true;
      } else {
        return false;
      }
    }

    if (!loginData.user.user.code) {
      console.error("No code exists");
      return;
    }

    let dataToSend = qs.stringify({
      grant_type: "authorization_code",
      code: loginData.user.user.code,
      client_id: loginData.user.accountAppInfo.credentials.clientId,
      client_secret: loginData.user.accountAppInfo.credentials.clientSecret,
      redirect_uri: loginData.user.accountAppInfo.credentials.redirectUrl,
    });

    let sfAccessTokenConfig = {
      method: "post",
      url: "https://login.salesforce.com/services/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataToSend,
    };

    let result = await axios(sfAccessTokenConfig).catch((error) =>
      console.warn(error)
    );

    if (!result || !result.data) {
      console.warn("No data returned");
      return;
    }

    console.log("*** SF DATA ***");
    console.log("Access Token: " + result.data.access_token);
    accessTokenVar(result.data.access_token);

    let doesUserMatch = await userMatch(
      result.data.access_token,
      result.data.id
    );

    if (!doesUserMatch) {
      console.error("User logged into app does not match Salesforce user.");
      return;
    }

    navigation.replace("Scan");
  }

  let browserDetails = {
    username: userDetails.username,
    domain: userDetails.domain,
    clientId: userData ? userData.checkUser.clientId : null,
  };

  function browserOpen() {
    if (authBrowserVisible) {
      setAuthBrowserVisible(false);
    } else {
      setAuthBrowserVisible(true);
    }
  }

  return (
    <View>
      <AuthBrowser
        browserVisible={authBrowserVisible}
        browserOpen={() => {
          setAuthBrowserVisible(!authBrowserVisible);
        }}
        browserDetails={browserDetails}
        continueFunction={continueFunction}
      />
      <TextInput
        placeholder="Username"
        value={userDetails.username || ""}
        onChangeText={(username) =>
          setUserDetails({ ...userDetails, username: username })
        }
        autoCapitalize={false}
      />
      <TextInput
        placeholder="Domain"
        value={userDetails.domain || ""}
        onChangeText={(domain) =>
          setUserDetails({ ...userDetails, domain: domain })
        }
        autoCapitalize={false}
      />
      <Button title="Login" onPress={loginHandler} />
    </View>
  );
}

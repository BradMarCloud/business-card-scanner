import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { auth } from "../components/graphql/util/auth";
import { MUTATION_Login_User } from "../components/graphql/mutations/mutations";
import { QUERY_CheckUser } from "../components/graphql/queries/queries";

export default function Login({ navigation }) {
  const [userDetails, setUserDetails] = useState({});

  const [login, { error: loginError, data: loginData }] = useMutation(MUTATION_Login_User);
  const {
    data: userData,
    error: userError,
    loading: userLoading,
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
      console.log(userData);
    }

    const result = await login({
      variables: { username: userDetails.username, domainName: userDetails.domain },
    });

    console.log(result);

    if (loginError) {
      console.error(loginError);
    }

    if (result.data) {
      console.log(result.data);
    }

    await auth.login(result.data.user.token);
  }

  return (
    <View>
      {/* <SalesforceAuthentication SFAuthVisible={} browserDetails={{}}  /> */}
      <TextInput
        placeholder="Username"
        value={userDetails.username || ""}
        onChangeText={(username) => setUserDetails({ ...userDetails, username: username })}
        autoCapitalize={false}
      />
      <TextInput
        placeholder="Domain"
        value={userDetails.domain || ""}
        onChangeText={(domain) => setUserDetails({ ...userDetails, domain: domain })}
        autoCapitalize={false}
      />
      <Button title="Login" onPress={loginHandler} />
    </View>
  );
}

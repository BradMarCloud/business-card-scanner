import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navigation from "./components/navigation/Navigation";

const client = new ApolloClient({
  uri: "https://marcloudtechnologies.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

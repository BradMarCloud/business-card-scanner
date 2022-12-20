import { Modal, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function AuthBrowser({
  browserVisible,
  browserOpen,
  browserDetails,
  continueFunction,
}) {
  if (!browserDetails) {
    return;
  }
  const domain = browserDetails.domain;
  const username = browserDetails.username;
  const clientId = browserDetails.clientId;
  // Encoded Username
  const encodedUsername = encodeURIComponent(username);

  const uri = `https://${domain}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=https://marcloudtechnologies.herokuapp.com/sfauth&prompt=login%20consent&state=${encodedUsername}`;

  function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  function webViewNavigationChange(newNavState) {
    const { url } = newNavState;

    if (!url) {
      console.log("NO URL FOUND");
      return;
    }

    if (
      url.includes("https://marcloudtechnologies.herokuapp.com/sfauth?code")
    ) {
      sleep(3000);
      browserOpen();
      continueFunction();
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={browserVisible}
      onRequestClose={browserOpen}
      transparent={true}
    >
      <View style={styles.view}>
        <WebView
          source={{ uri: uri }}
          onNavigationStateChange={(ref) => webViewNavigationChange(ref)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

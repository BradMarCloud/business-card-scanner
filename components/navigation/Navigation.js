import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../views/Login";
import Scan from "../../views/Scan";
import ProspectInformation from "../../views/ProspectInformation";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="ProspectInformation" component={ProspectInformation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

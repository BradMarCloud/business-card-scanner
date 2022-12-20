import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_Decode from "jwt-decode";

export async function getProfile() {
  const token = await getToken();
  let decodedToken = jwt_Decode(token);
  return decodedToken;
}
export async function loggedIn() {
  const token = await getToken();
  const tokenExpired = await isTokenExpired(token);
  return token && tokenExpired ? true : false;
}
export async function isTokenExpired(token) {
  const decodedToken = jwt_Decode(token);
  if (decodedToken.exp <= Date.now() / 1000) {
    try {
      await AsyncStorage.removeItem("id_token");
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  return false;
}
export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("id_token");
    return token;
  } catch (error) {
    console.error(error);
  }
}
export async function loggingIn(token) {
  try {
    await AsyncStorage.setItem("id_token", token);
  } catch (error) {
    console.error(error);
  }
}
export async function logout() {
  try {
    await AsyncStorage.removeItem("id_token");
  } catch (error) {
    console.error(error);
  }
}

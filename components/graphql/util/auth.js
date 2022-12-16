import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const auth = {
  async getProfile() {
    const token = await this.getToken();
    let decodedToken = jwtDecode(token);
    return decodedToken;
  },
  async loggedIn() {
    const token = await this.getToken();
    const tokenExpired = await this.isTokenExpired(token);
    return token && !tokenExpired ? true : false;
  },
  async isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp > Date.now() / 1000) {
      await AsyncStorage.removeItem("id_token");
      return true;
    }
    return false;
  },
  async getToken() {
    return await AsyncStorage.getItem("id_token");
  },
  async login(token) {
    await AsyncStorage.setItem("id_token", token);
  },
  async logout() {
    await AsyncStorage.removeItem("id_token");
  },
};

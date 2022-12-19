import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_Decode from "jwt-decode";

export const auth = {
  async getProfile() {
    const token = await this.getToken();
    let decodedToken = jwt_Decode(token);
    return decodedToken;
  },
  async loggedIn() {
    const token = await this.getToken();
    const tokenExpired = await this.isTokenExpired(token);
    return token && !tokenExpired ? true : false;
  },
  async isTokenExpired(token) {
    const decodedToken = jwt_Decode(token);
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
    return await AsyncStorage.setItem("id_token", token);
  },
  async logout() {
    return await AsyncStorage.removeItem("id_token");
  },
};

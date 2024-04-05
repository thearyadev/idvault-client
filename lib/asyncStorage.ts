import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Token } from "./types";

export async function getToken() {
  return await AsyncStorage.getItem("token");
}
export async function setToken(token: Token) {
  await AsyncStorage.setItem("token", token);
}

export async function getUsersName() {
  return await AsyncStorage.getItem("name");
}

export async function setUsersName(name: string) {
  await AsyncStorage.setItem("name", name);
}

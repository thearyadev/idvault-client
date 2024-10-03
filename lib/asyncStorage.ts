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

export async function getUsername() {
  return await AsyncStorage.getItem("username");
}

export async function setUsername(username: string) {
  await AsyncStorage.setItem("username", username);
}

export async function setPublicKey(publicKey: string, username: string) {
  await AsyncStorage.setItem("publicKey" + username, publicKey);
  console.log(await AsyncStorage.getAllKeys())
}

export async function getPublicKey(username: string) {
  return await AsyncStorage.getItem("publicKey" + username);
}

export async function setPrivateKey(privateKey: string, username: string) {
  await AsyncStorage.setItem("privateKey" + username, privateKey);
}

export async function getPrivateKey(username: string) {
  return await AsyncStorage.getItem("privateKey" + username);
}

export async function wipe() {
  AsyncStorage.removeItem("username");
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("name");
}

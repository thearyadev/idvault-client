import { Stack } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "components/navbar/navbar";

export default function BaseLayout() {
  // AsyncStorage.clear()
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home/home"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home/search/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home/my_account/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="home/about_idvault/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />



        <Stack.Screen name="home/view_document" options={{presentation: "modal", headerShown: false}}/>
        <Stack.Screen name="home/add_document" options={{presentation: "modal", headerShown: false}}/>
      </Stack>
      <Navbar />
    </>
  );
}


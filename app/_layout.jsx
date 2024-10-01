import { Stack } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "components/navbar/navbar";
import { RootSiblingParent } from "react-native-root-siblings";

export default function BaseLayout() {
  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Anytime"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/login"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/PersonalDetailsScreenOne"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/PersonalDetailsScreenTwo"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/PersonalDetailsScreenThree"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/Terms"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="authentication/ForgotPassword"
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
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


        <Stack.Screen name="authentication/register" options={{ presentation: "modal", headerShown: false }} />
        <Stack.Screen name="home/view_document" options={{ presentation: "modal", headerShown: false }} />
        <Stack.Screen name="home/add_document" options={{ presentation: "modal", headerShown: false }} />
      </Stack>
      <Navbar />
    </RootSiblingParent>
  );
}


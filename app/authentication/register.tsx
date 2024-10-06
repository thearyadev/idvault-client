import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { login, register, userDetails } from "lib/api";
import { Redirect, router } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonLarge from "components/buttons/button_large";
import LinkText from "components/text/link";
import { getToken, setUsersName } from "lib/asyncStorage";
import Content from "components/wrappers/content";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputStyle } from "components/styles/inputStyle";
import { buttonStyle } from "components/styles/buttonStyle";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Content>
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              onChangeText={setUsername}
              style={{ ...inputStyle.input, marginBottom: 15 }}
              autoCapitalize="none"
              placeholderTextColor="black"
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              style={{ ...inputStyle.input, marginBottom: 15 }}
              placeholderTextColor="black"
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Name"
              onChangeText={setName}
              style={{ ...inputStyle.input, marginBottom: 15 }}
              placeholderTextColor="black"
            />
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              style={{ ...inputStyle.input, marginBottom: 15 }}
              placeholderTextColor="black"
              textContentType="emailAddress"
            />
            <TextInput
              placeholder="Phone Number"
              style={{ ...inputStyle.input, marginBottom: 15 }}
              onChangeText={setPhoneNumber}
              placeholderTextColor="black"
              textContentType="telephoneNumber"
            />
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={buttonStyle.buttonStyle}
                onPress={() => {
                  register(username, password, name, email, phoneNumber)
                    .then(() => {
                      router.navigate("authentication/login");
                    })
                    .catch();
                }}
              >
                <Text style={{ color: "white" }}>Register</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    paddingBottom: 50,
    width: 300,
  },
  forgotPassword: {
    textAlign: "right",
    paddingTop: 20,
    paddingRight: 10,
  },
  registerPrompt: {
    color: "white",
  },
  registerPromptLink: {
    paddingLeft: 5,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
  },
  iconContainer: {
    padding: 30,
  },
});

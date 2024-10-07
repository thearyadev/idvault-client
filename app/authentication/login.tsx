import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getRecipientPublicKey, login, userDetails } from "lib/api";
import { Redirect, router } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonLarge from "components/buttons/button_large";
import LinkText from "components/text/link";
import {
  getToken,
  getUsername,
  setUsersName,
  setUsername as setUsernameStore,
} from "lib/asyncStorage";
import Content from "components/wrappers/content";
import { FontAwesome } from "@expo/vector-icons";
import { generateEncryptionKeys, loadKeys, saveKeys } from "lib/encryption";
import { savePublicKey } from "lib/api";
import { inputStyle } from "components/styles/inputStyle";
import { buttonStyle } from "components/styles/buttonStyle";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tokenAuth, setTokenAuth] = useState(false);

  useEffect(() => {
    getToken().then((stored_token) => {
      if (stored_token) {
        userDetails(stored_token).then((user_details) => {
          setTokenAuth(true);
          setUsersName(user_details.name);
        });
      }
    });
  }, []);

  if (tokenAuth) {
    getToken().then((stored_token) => {
      loadKeys().then((keys) => {
        if (!keys) {
          const newKeys = generateEncryptionKeys();
          saveKeys(newKeys, username);
          return;
        }
        savePublicKey(keys.publicKey, stored_token!);
      });
    });
    return <Redirect href="/home/home" />;
  }
  return (
    <Content>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle" size={130} color="#2b2bb3" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            onChangeText={setUsername}
            style={inputStyle.input}
            autoCapitalize="none"
            placeholderTextColor="gray"
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={setPassword}
            style={{ ...inputStyle.input, marginTop: 20 }}
            placeholderTextColor="gray"
          />
          <Pressable
            style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
            onPress={() => {
              login(username, password).then(() => {
                getToken().then((stored_token) => {
                  userDetails(stored_token as string).then((user_details) => {
                    setTokenAuth(true);
                    setUsersName(user_details.name);
                  });
                });
              });
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerPrompt}>New to IDVault?</Text>
          <LinkText
            label="Register"
            style={styles.registerPromptLink}
            onPress={() => {
              router.navigate("/authentication/register");
            }}
          />
        </View>
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
    color: "black",
  },
  registerPromptLink: {
    paddingLeft: 5,
    color: "#2b2bb3",
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

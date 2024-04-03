import { Text, View, TextInput, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Token } from "lib/types";
import { login, userDetails } from "lib/api";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonLarge from "components/buttons/button_large";
import LinkText from "components/text/link";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [tokenAuth, setTokenAuth] = useState(false);

  useEffect(() => {
    getToken().then((stored_token) => {
      if (stored_token) {
        userDetails(stored_token).then(() => {
          setToken(stored_token).then(() => {
            setTokenAuth(true);
          });
        });
      }
    });
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };
  const setToken = async (token: Token) => {
    await AsyncStorage.setItem("token", token);
  };

  if (tokenAuth) {
    return <Redirect href="/home/home" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
          style={styles.input}
        />
        <LinkText
          label="Forgot Password?"
          style={styles.forgotPassword}
          onPress={undefined} // go to password recovery
        />
      </View>
      <ButtonLarge
        label="Login"
        onPress={() => {
          login(username, password).then((token) => {
            if (token) {
              setToken(token).then(() => {
                setTokenAuth(true);
              });
            } else {
              setError(true);
            }
          });
        }}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerPrompt}>New to IDVault?</Text>

        <LinkText label="Register" style={styles.registerPromptLink} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 70,
    marginTop: 10,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "white",
  },
  inputContainer: {
    paddingBottom: 50,
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
    paddingLeft: 5
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60
  }
});

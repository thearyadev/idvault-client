import { Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { login, userDetails } from "lib/api";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonLarge from "components/buttons/button_large";
import LinkText from "components/text/link";
import { getToken, setUsersName } from "lib/asyncStorage";

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
          login(username, password).then(() => {
            getToken().then((stored_token) => {
              userDetails(stored_token as string).then((user_details) => {
                setTokenAuth(true);
                setUsersName(user_details.name);
              });
            });
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
    paddingLeft: 5,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
  },
});

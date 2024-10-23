import { Text, View, TextInput, Pressable, Button, Alert } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register, userDetails } from "lib/api";
import { Redirect, router } from "expo-router";
import { StyleSheet } from "react-native";
import ButtonLarge from "components/buttons/button_large";
import LinkText from "components/text/link";
import { getToken, setUsersName } from "lib/asyncStorage";
import Content from "components/wrappers/content";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputStyle as inputStyleBase } from "components/styles/inputStyle";
import { buttonStyle } from "components/styles/buttonStyle";

interface RegistrationContextProps {
  username: string;
  setUsername: (newUsername: string) => void;

  password: string;
  setPassword: (newPassword: string) => void;

  name: string;
  setName: (newName: string) => void;

  email: string;
  setEmail: (newEmail: string) => void;

  currentStage: number;
  setCurrentStage: (newStage: number) => void;
}
const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined,
);

const inputStyle = StyleSheet.create({
  input: {
    ...inputStyleBase.input,
    width: 250,
  },
});
function Stage4({ visible = false }: { visible?: boolean }) {
  const ctx = useContext(RegistrationContext)!;
  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        flex: 1,
        justifyContent: "space-between", 
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 23, textAlign: "center", paddingBottom: 10 }}>
          Select a Password
        </Text>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TextInput
            style={inputStyle.input}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={ctx.setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={{ paddingBottom: 20, alignItems: "center" }}>
        <Pressable style={{ ...buttonStyle.buttonStyle, width: 300, opacity: ctx.password === "" ? 0.5 : 1 }}
          disabled={ctx.password === ""}
          onPress={() => {
            register(ctx.username, ctx.password, ctx.name, ctx.email, "DEPRECATED").then(() => {
              router.navigate("/authentication/login")
              Alert.alert("Account Created!", "Your IDVault account has been created. Log in to get started.")
            }).catch(() => {
                router.navigate("/authentication/login")
                Alert.alert("Failed to Register!", "Something went wrong.")
              })
          }}
        >
          <Text style={{ color: "white" }}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Stage3({ visible = false }: { visible?: boolean }) {
  const { setCurrentStage, username, setUsername } = useContext(RegistrationContext)!;
  const [error, setError] = useState("")
  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        flex: 1,
        justifyContent: "space-between", 
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 23, textAlign: "center", paddingBottom: 10 }}>
          Pick a Username
        </Text>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TextInput
            style={inputStyle.input}
            placeholder="Username"
            placeholderTextColor="gray"
            onChangeText={(enteredUsername) => {
              if (enteredUsername.includes(" ")){
                setError("Username must not contain spaces")
              } else {
                setError("")
              }
              setUsername(enteredUsername)
            }}
            autoCapitalize="none"
          />
          <Text style={{color: "red"}}>{error}</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 20, alignItems: "center" }}>
        <Pressable style={{ ...buttonStyle.buttonStyle, width: 300, opacity: username === "" || username.includes(" ") ? 0.5 : 1 }}
          disabled={username === "" || username.includes(" ")}
          onPress={() => {
              setCurrentStage(4)
          }}
        >
          <Text style={{ color: "white" }}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Stage2({ visible = false }: { visible?: boolean }) {
  const { setCurrentStage, setEmail, email } = useContext(RegistrationContext)!;
  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        flex: 1,
        justifyContent: "space-between", 
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 23, textAlign: "center", paddingBottom: 10 }}>
          Enter your e-mail  
        </Text>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TextInput
            style={inputStyle.input}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={{ paddingBottom: 20, alignItems: "center" }}>
        <Pressable style={{ ...buttonStyle.buttonStyle, width: 300, opacity: email === "" ? 0.5 : 1 }}
          disabled={email === ""}
          onPress={() => {
              setCurrentStage(3)
          }}
        >
          <Text style={{ color: "white" }}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}


function Stage1({ visible = false }: { visible?: boolean }) {
  const { setCurrentStage, setName, name } = useContext(RegistrationContext)!;
  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        flex: 1,
        justifyContent: "space-between", 
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 23, textAlign: "center", paddingBottom: 10 }}>
          What is your name?
        </Text>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TextInput
            style={inputStyle.input}
            placeholder="Name"
            placeholderTextColor="gray"
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>
      </View>

      <View style={{ paddingBottom: 20, alignItems: "center" }}>
        <Pressable style={{ ...buttonStyle.buttonStyle, width: 300, opacity: name === "" ? 0.5 : 1 }}
          disabled={name === ""}
          onPress={() => {
              setCurrentStage(2)
          }}
        >
          <Text style={{ color: "white" }}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <Content>
      <View style={styles.container}>
        <RegistrationContext.Provider
          value={{
            username,
            setUsername,
            password,
            setPassword,
            name,
            setName,
            email,
            setEmail,
            currentStage,
            setCurrentStage,
          }}
        >
          <Stage1 visible={currentStage === 1} />
          <Stage2 visible={currentStage === 2} />
          <Stage3 visible={currentStage === 3} />
          <Stage4 visible={currentStage === 4} />
        </RegistrationContext.Provider>
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

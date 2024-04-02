import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";

export default function AppHome() {
  return (
    <View>
      <Text>Welcome to IDVault. This is the landing page.</Text>
      <StatusBar style="auto" />
      <View>
          <Button title="Go to homepage!" onPress={() => router.navigate("/home/home")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({},);

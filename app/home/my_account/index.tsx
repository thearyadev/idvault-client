import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonLarge from "components/buttons/button_large";
import Content from "components/wrappers/content";
import { router } from "expo-router";
import { wipe } from "lib/asyncStorage";
import { Text } from "react-native";
export default function MyAccountScreen() {
  return (
    <Content>
      <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
        My Account
      </Text>
      <ButtonLarge
        label="Logout"
        style={{ width: "100%" }}
        onPress={() => {
          wipe().then(() => {
            router.navigate("authentication/login");
          });
        }}
      />
    </Content>
  );
}

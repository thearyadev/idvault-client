import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonLarge from "components/buttons/button_large";
import WhiteText from "components/text/white_text";
import Content from "components/wrappers/content";
import { router } from "expo-router";
export default function MyAccountScreen() {
  return (
    <Content>
      <WhiteText>My Account</WhiteText>
      <ButtonLarge
        label="Logout"
        onPress={() => {
          AsyncStorage.clear().catch()
          router.navigate("authentication/login");
        }}
      />
    </Content>
  );
}

import { Link } from "expo-router";
import { Text } from "react-native";
import { login } from "lib/api";
import WhiteText from "components/text/white_text";
export default function AppHome(){
  return (
      <WhiteText>Welcome to IDVault</WhiteText>
  );
}

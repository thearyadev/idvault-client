import { Slot} from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";
export default function BaseLayout() {
  return <View style={styles.container}>
    <Slot />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C4D7D",
    alignItems: "center",
    justifyContent: "center",
  },
})

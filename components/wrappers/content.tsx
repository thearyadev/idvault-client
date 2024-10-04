import { ReactNode } from "react";
import { ImageBackground, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <ImageBackground source={require("assets/app_bg.png")}>
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
});

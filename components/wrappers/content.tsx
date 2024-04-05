import { ReactNode } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Content({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "blue"
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "blue",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

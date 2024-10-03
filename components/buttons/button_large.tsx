import React from "react";
import { Text, Pressable, StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
export default function ButtonLarge({
  onPress,
  style = {},
  label,
}: {
  onPress: () => void;
  style?: StyleProp<TextStyle>;
  label?: string;
}) {
  return (
    <Pressable
      style={{ ...styles.btnStyle, ...(style as object) }}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    width: 100,
    height: 70,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { Text, Pressable, StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function ButtonSquareWithIcon({
  onPress,
  style = {},
  label,
  children,
  icon
}: {
  onPress: () => void;
  style?: StyleProp<TextStyle>;
  label?: string;
  children: React.ReactNode;
  icon: string;
}) {
  return (
    <Pressable
      style={{ ...styles.btnStyle, ...(style as object) }}
      onPress={onPress}
    >
      {React.cloneElement(children as React.ReactElement<any>, {
          color: "black",
          size: 38,
          name: icon,
        })}
      <Text style={styles.btnLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    width: 100,
    height: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  btnLabel: {
    textAlign: "center",
    paddingTop: 3
  }
});

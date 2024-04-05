import React from "react";
import { Link } from "expo-router";
import { Text, Pressable, StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
export default function ButtonSquareWithIcon({
  pathname,
  data,
  style = {},
  label,
  children,
  icon,
}: {
  style?: StyleProp<TextStyle>;
  label?: string;
  children: React.ReactNode;
  icon: string;
  pathname: string;
  data: any;
}) {
  return (
    <Link
      href={{
        pathname: pathname,
        params: data,
      }}
      asChild
    >
      <Pressable style={{ ...styles.btnStyle, ...(style as object) }}>
        {React.cloneElement(children as React.ReactElement<any>, {
          color: "black",
          size: 38,
          name: icon,
        })}
        <Text style={styles.btnLabel}>{label}</Text>
      </Pressable>
    </Link>
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
    paddingTop: 3,
  },
});

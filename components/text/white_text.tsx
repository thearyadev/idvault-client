import { StyleSheet, Text, TextProps } from "react-native";

export default function WhiteText(props: TextProps) {
  return (
    <Text
      {...props}
      style={{ ...styles.linkText, ...(props.style as object) }}
    ></Text>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "white",
  },
});

import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

export default function LinkText({
  onPress,
  style = {},
  label,
}: {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  label?: string;
}) {
  return (
    <Text
      style={{ ...styles.linkText, ...(style as object) }}
      onPress={onPress}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "white",
    textDecorationLine: "underline",
  },
});

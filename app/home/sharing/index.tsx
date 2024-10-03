import ButtonLarge from "components/buttons/button_large";
import WhiteText from "components/text/white_text";
import Content from "components/wrappers/content";
import { router } from "expo-router";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ButtonSquareWithIcon from "components/buttons/button_square";
import { StyleSheet } from "react-native";

import BottomSheet, {
  BottomSheetMethods,
} from "@devvie/bottom-sheet/src/index";
import { useEffect, useRef, useState } from "react";
import { GenericDocument } from "lib/types";
import { getToken } from "lib/asyncStorage";
import { getAllDocuments } from "lib/api";

export default function SearchScreen() {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [documents, setDocuments] = useState<GenericDocument[]>([]);

  useEffect(() => {
    getToken().then((stored_token) => {
      if (stored_token) {
        getAllDocuments(stored_token).then((documents) => {
          setDocuments(documents);
        });
      }
    });
  }, []);

  return (
    <Content>
      <WhiteText>Sharing</WhiteText>
      <Pressable
        style={styles.btnStyle}
        onPress={() => {
          sheetRef.current?.open();
        }}
      >
        <Text style={styles.btnLabel}>Share a Document</Text>
      </Pressable>
      <BottomSheet ref={sheetRef}>
        <View style={{ padding: 15 }}></View>
      </BottomSheet>
    </Content>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
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

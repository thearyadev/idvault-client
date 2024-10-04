import ButtonLarge from "components/buttons/button_large";
import WhiteText from "components/text/white_text";
import Content from "components/wrappers/content";
import { router } from "expo-router";
import { Link } from "expo-router";
import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";
import ButtonSquareWithIcon from "components/buttons/button_square";
import { StyleSheet } from "react-native";

import BottomSheet, {
  BottomSheetMethods,
} from "@devvie/bottom-sheet/src/index";
import { useEffect, useRef, useState } from "react";
import { GenericDocument, Token } from "lib/types";
import { getToken } from "lib/asyncStorage";
import { createSharedDocument, getAllDocuments, getAllSharedDocuments} from "lib/api";

export default function SearchScreen() {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [documents, setDocuments] = useState<GenericDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<GenericDocument | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [token, setToken] = useState<Token>();
  const [sharedDocuments, setSharedDocuments] = useState<GenericDocument[]>([]);

  useEffect(() => {
    getToken().then((stored_token) => {
      if (stored_token) {
        setToken(stored_token);
        getAllDocuments(stored_token).then((documents) => {
          setDocuments(documents);
        });
        getAllSharedDocuments(stored_token).then((documents) => {
          setSharedDocuments(documents);
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
          setSelectedDocument(null); // when user opens the bottom sheet, no document is selected
          sheetRef.current?.open();
        }}
      >
        <Text style={styles.btnLabel}>Share a Document</Text>
      </Pressable>


      <View>
        <WhiteText>Documents Shard With You</WhiteText>
        <View style={styles.container}>
          {sharedDocuments.map((document, index) => (
            <Button key={index}
              title={document.documentId.toString()}
              onPress={() => {
                Alert.alert(`This is a shared document (id=${document.documentId}). View not implemented`)
              }}
            >
            </Button>
          ))}
          </View>


      </View>





      <BottomSheet ref={sheetRef}>
        <View style={{ padding: 15 }}>
          <Text>Select a Document to Share</Text>
          <View style={styles.container}>
            {documents.map((document, index) => (
              <Button key={index}
                title={document.documentId.toString()}
                onPress={() => {
                  setSelectedDocument(document);
                }}
              >


              </Button>
            ))}
          </View>
          <TextInput
            placeholder="Recipient Username (this is a text field)"
            onChangeText={setRecipient}
            placeholderTextColor="black"
            autoCapitalize="none"
          />
          <Button
            title="Share"
            onPress={() => {

              if (!selectedDocument) {

                Alert.alert("A document was not selected")
                return;
              }

              if (!recipient) {
                Alert.alert("A recipient was not entered")
                return;
              }

               createSharedDocument(selectedDocument, recipient, token!).then(() => {
                  Alert.alert("Document shared successfully")
                  sheetRef.current?.close(); // make this a callback so the user presses OK then goes back home. 
                  router.navigate("/home/home")
               }).catch((error) => {
               console.log(error)
                  Alert.alert("Error sharing document")
               })
              

            }}
          />


        </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

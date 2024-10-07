import ButtonLarge from "components/buttons/button_large";
import Content from "components/wrappers/content";
import { router } from "expo-router";
import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

import BottomSheet, {
  BottomSheetMethods,
} from "@devvie/bottom-sheet/src/index";
import { useEffect, useRef, useState } from "react";
import {
  BirthCertificate,
  DriversLicense,
  GenericDocument,
  Passport,
  Token,
} from "lib/types";
import { getToken, getUsername } from "lib/asyncStorage";
import {
  createSharedDocument,
  getAllDocuments,
  getAllSharedDocuments,
} from "lib/api";
import QRCode from "react-native-qrcode-svg";
import { AntDesign } from "@expo/vector-icons";
import { buttonStyle } from "components/styles/buttonStyle";
import Octicons from "@expo/vector-icons/Octicons";
import {
  BirthCertificateSheet,
  DriversLicenceSheet,
  PassportSheet,
} from "components/documentSheets/documentSheets";
import { ScrollView } from "react-native";
import { DocumentCard } from "components/buttons/document_card";
import { bottomSheetStyles } from "components/styles/bottomSheetStyles";
import { inputStyle } from "components/styles/inputStyle";

export default function SearchScreen() {
  const shareSheetRef = useRef<BottomSheetMethods>(null);
  const passportSheetRef = useRef<BottomSheetMethods>(null);
  const birthCertificateSheetRef = useRef<BottomSheetMethods>(null);
  const driversLicenseSheetRef = useRef<BottomSheetMethods>(null);
  const qrCodeSheetRef = useRef<BottomSheetMethods>(null);

  const [documents, setDocuments] = useState<GenericDocument[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<GenericDocument | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [token, setToken] = useState<Token>();
  const [sharedDocuments, setSharedDocuments] = useState<GenericDocument[]>([]);
  const [username, setUsername] = useState<string>("");
  const [currentDocument, setCurrentDocument] =
    useState<GenericDocument | null>(null);

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
        getUsername().then((username) => {
          setUsername(username!);
        });
      }
    });
  }, []);

  return (
    <Content>
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Documents Shared with You</Text>
          </View>
          <View style={styles.container}>
            <ScrollView style={styles.yourDocumentsScrollView}>
              {sharedDocuments.length ? (
                sharedDocuments.map((document, index) => {
                  return (
                    <DocumentCard
                      document={document}
                      key={index}
                      callback={() => {
                        console.log(`Document ${document.documentId} clicked!`);
                        if (document.documentType === "Passport") {
                          setCurrentDocument(document);
                          passportSheetRef.current?.open();
                        }
                        if (document.documentType === "BirthCertificate") {
                          setCurrentDocument(document);
                          birthCertificateSheetRef.current?.open();
                        }
                        if (document.documentType === "DriversLicense") {
                          setCurrentDocument(document);
                          driversLicenseSheetRef.current?.open();
                        }
                      }}
                    />
                  );
                })
              ) : (
                <View></View>
              )}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Pressable
            style={{ ...buttonStyle.buttonStyle, width: "48%" }}
            onPress={() => {
              shareSheetRef.current?.open();
            }}
          >
            <Octicons name="share" size={24} color="white" />
          </Pressable>

          <Pressable
            style={{ ...buttonStyle.buttonStyle, width: "48%" }}
            onPress={() => {
              qrCodeSheetRef.current?.open();
            }}
          >
            <AntDesign name="qrcode" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <BottomSheet ref={qrCodeSheetRef} style={bottomSheetStyles.bottomSheet}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <QRCode
            value={username ? username : "username not found"}
            size={200}
          />
        </View>
      </BottomSheet>

      <BottomSheet ref={shareSheetRef} style={bottomSheetStyles.bottomSheet}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            Select a Document to Share
          </Text>
          <View style={styles.container}>
            {documents.map((document, index) => (
              <Button
                key={index}
                title={document.documentId.toString()}
                onPress={() => {
                  setSelectedDocument(document);
                }}
              ></Button>
            ))}
            <TextInput
              placeholder="Recpient Username"
              onChangeText={setUsername}
              style={inputStyle.input}
              autoCapitalize="none"
              placeholderTextColor="gray"
            />
          </View>
          <Pressable
            style={buttonStyle.buttonStyle}
            onPress={() => {
              if (!selectedDocument) {
                Alert.alert("A document was not selected");
                return;
              }

              if (!recipient) {
                Alert.alert("A recipient was not entered");
                return;
              }

              createSharedDocument(selectedDocument, recipient, token!)
                .then(() => {
                  Alert.alert("Document shared successfully");
                  shareSheetRef.current?.close(); // make this a callback so the user presses OK then goes back home.
                  router.navigate("/home/home");
                })
                .catch((error) => {
                  console.log(error);
                  Alert.alert("Error sharing document");
                });
            }}
          >
            <Text style={{ color: "white" }}>Share</Text>
          </Pressable>
        </View>
      </BottomSheet>

      <PassportSheet
        sheetRef={passportSheetRef}
        document={currentDocument as Passport}
      />
      <BirthCertificateSheet
        sheetRef={birthCertificateSheetRef}
        document={currentDocument as BirthCertificate}
      />
      <DriversLicenceSheet
        sheetRef={driversLicenseSheetRef}
        document={currentDocument as DriversLicense}
      />
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
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  welcomeTextContainer: {
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
    textAlign: "center",
  },
  yourDocumentsScrollView: {
    paddingBottom: 10,
  },
});

// <QRCode value={username ? username : "username not found"} />
// <Pressable
//   style={styles.btnStyle}
//   onPress={() => {
//     setSelectedDocument(null); // when user opens the bottom sheet, no document is selected
//     sheetRef.current?.open();
//   }}
// >
//   <Text style={styles.btnLabel}>share a document</Text>
// </Pressable>
// <Pressable
//   style={styles.btnStyle}
//   onPress={() => {
//     // Alert.alert("Your share code is: " + userShareCode)
//   }}
// >
//   <Text style={styles.btnLabel}>view your share code</Text>
// </Pressable>

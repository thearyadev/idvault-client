import { useEffect, useRef, useState } from "react";
import { getUsersName } from "lib/asyncStorage";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Content from "components/wrappers/content";
import { BirthCertificate, DriversLicense, GenericDocument, Passport } from "lib/types";
import ButtonSquareWithIcon from "components/buttons/button_square";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { DocTypes } from "lib/types";
import { getAllDocuments } from "lib/api";
import { getToken } from "lib/asyncStorage";
import { buttonStyle } from "components/styles/buttonStyle";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet/src";
import { bottomSheetStyles } from "components/styles/bottomSheetStyles";
import { Link } from "expo-router";
import { DocumentCard } from "components/buttons/document_card";
import { PassportSheet, BirthCertificateSheet, DriversLicenceSheet } from "components/documentSheets/documentSheets";

export default function AppHome() {
  const [name, setName] = useState("");
  const [documents, setDocuments] = useState<
    (Passport | BirthCertificate | DriversLicense)[]
  >([]);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const passportSheetRef = useRef<BottomSheetMethods>(null);
  const birthCertificateSheetRef = useRef<BottomSheetMethods>(null);
  const driversLicenseSheetRef = useRef<BottomSheetMethods>(null);

  const [currentDocument, setCurrentDocument] = useState<GenericDocument | null>(null);

  useEffect(() => {
    getUsersName().then((stored_name) => {
      if (stored_name) {
        setName(stored_name);
        return;
      }
      setName("Error");
    });

    // get all documents
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
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Welcome, {name}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Your Documents</Text>
        <View style={styles.separator} />
        <View style={styles.yourDocuments}>
          <ScrollView style={styles.yourDocumentsScrollView}>
            {documents.length ? (
              documents.map((document, index) => {
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
              <Text style={styles.noDocumentsFoundText}>
                No Documents Found! Click below to add a document.
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Pressable
            style={buttonStyle.buttonStyle}
            onPress={() => {
              sheetRef.current?.open();
            }}
          >
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <BottomSheet
        ref={sheetRef}
        style={bottomSheetStyles.bottomSheet}
        height="40%"
      >
        <Text style={{ width: "100%", textAlign: "center" }}>
          Add a Document
        </Text>
        <View style={styles.addDocumentContainer}>
          <Link
            href={{
              pathname: "/home/add_document",
              params: { documentType: "DriversLicense" },
            }}
            asChild
          >
            <Pressable
              style={styles.iconBtn}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <AntDesign
                style={styles.iconBtnIcon}
                color="black"
                size={38}
                name="car"
              />
              <Text style={styles.iconBtnText}>Drivers License</Text>
            </Pressable>
          </Link>
          <Link
            href={{
              pathname: "/home/add_document",
              params: { documentType: "BirthCertificate" },
            }}
            asChild
          >
            <Pressable
              style={styles.iconBtn}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <FontAwesome5
                style={styles.iconBtnIcon}
                color="black"
                size={38}
                name="certificate"
              />
              <Text style={styles.iconBtnText}>Birth Certificate</Text>
            </Pressable>
          </Link>
          <Link
            href={{
              pathname: "/home/add_document",
              params: { documentType: "Passport" },
            }}
            asChild
          >
            <Pressable
              style={styles.iconBtn}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <FontAwesome5
                style={styles.iconBtnIcon}
                color="black"
                size={38}
                name="passport"
              />
              <Text style={styles.iconBtnText}>Passport</Text>
            </Pressable>
          </Link>
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
  iconBtn: {
    marginTop: 10,
    width: 100,
    height: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: {
    textAlign: "center",
    paddingTop: 3,
  },
  iconBtnIcon: {},

  welcomeTextContainer: {
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    paddingTop: 20,
  },
  noDocumentsFoundText: {
    textAlign: "center",
  },
  addDocumentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  yourDocuments: {
    height: "70%",
  },
  yourDocumentsScrollView: {
    paddingBottom: 10,
  },
  separator: {
    height: 5,
    width: "100%",
    backgroundColor: "#2b2bb3",
    marginTop: 5,
    marginBottom: 10,
  },
});
// <View key={index}>
//   <ButtonSquareWithIcon
//     icon={docData.iconName}
//     label={docData.name}
//     pathname="/home/view_document"
//     data={{ documentId: document.documentId }}
//     style={{ marginLeft: 10 }}
//   >
//     <docData.iconComponent />
//   </ButtonSquareWithIcon>
// </View>

// <ButtonSquareWithIcon
//            label="Drivers License"
//            pathname="/home/add_document"
//            data={{ documentType: "DriversLicense" }}
//            icon="car"
//          >
//            <AntDesign />
//          </ButtonSquareWithIcon>
//          <ButtonSquareWithIcon
//            label="Passport"
//            pathname="/home/add_document"
//            data={{ documentType: "Passport" }}
//            icon="passport"
//          >
//            <FontAwesome5 />
//          </ButtonSquareWithIcon>
//          <ButtonSquareWithIcon
//            label="Birth Certificate"
//            pathname="/home/add_document"
//            data={{ documentType: "BirthCertificate" }}
//            icon="certificate"
//          >
//            <MaterialCommunityIcons />
//          </ButtonSquareWithIcon>

// <View style={styles.section}>

// <ButtonSquareWithIcon
//   label="Drivers License"
//   pathname="/home/add_document"
//   data={{ documentType: "DriversLicense" }}
//   icon="car"
// >
//   <AntDesign />
// </ButtonSquareWithIcon>
// <ButtonSquareWithIcon
//   label="Passport"
//   pathname="/home/add_document"
//   data={{ documentType: "Passport" }}
//   icon="passport"
// >
//   <FontAwesome5 />
// </ButtonSquareWithIcon>
// <ButtonSquareWithIcon
//   label="Birth Certificate"
//   pathname="/home/add_document"
//   data={{ documentType: "BirthCertificate" }}
//   icon="certificate"
// >
//   <MaterialCommunityIcons />
// </ButtonSquareWithIcon>
//        </View>
//      </View>

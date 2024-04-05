import WhiteText from "components/text/white_text";
import { useEffect, useState } from "react";
import { getUsersName } from "lib/asyncStorage";
import { StyleSheet, View } from "react-native";
import Content from "components/wrappers/content";
import {
  BirthCertificate,
  DocumentsArray,
  DriversLicense,
  GenericDocument,
  Passport,
} from "lib/types";
import ButtonSquareWithIcon from "components/buttons/button_square";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { DocTypes } from "lib/types";
import { router } from "expo-router";
export default function AppHome() {
  const [name, setName] = useState("");
  const [documents, setDocuments] = useState<
    (Passport | BirthCertificate | DriversLicense)[]
  >([
    // @ts-ignore
    {
      documentType: "DriversLicense",
    },
    // @ts-ignore
    {
      documentType: "BirthCertificate",
    },
    // @ts-ignore
    {
      documentType: "Passport",
    },
    // @ts-ignore
    {
      documentType: "DriversLicense",
    },
  ]);

  useEffect(() => {
    getUsersName().then((stored_name) => {
      if (stored_name) {
        setName(stored_name);
        return;
      }
      setName("Error");
    });
  });

  return (
    <Content>
      <View style={[styles.welcomeTextContainer, styles.section]}>
        <WhiteText style={styles.welcomeText}>Welcome, {name}</WhiteText>
      </View>
      <View style={styles.section}>
        <WhiteText style={styles.heading}>Your Documents</WhiteText>
        <View style={styles.yourDocuments}>
          <ScrollView horizontal style={styles.yourDocumentsScrollView}>
            {documents.length ? (
              documents.map((document, index) => {
                // @ts-ignore
                const docData = DocTypes[document.documentType as keyof typeof DocTypes];

                return (<View key={index}>
                  <ButtonSquareWithIcon icon={docData.iconName} label={docData.name} onPress={() => {router.navigate("/home/view_document")}} style={{marginLeft: 10}}>
                    <docData.iconComponent />
                  </ButtonSquareWithIcon>
                </View>)
              })
            ) : (
              <WhiteText style={styles.noDocumentsFoundText}>
                No Documents Found! Click below to add a document.
              </WhiteText>
            )}
          </ScrollView>
        </View>
      </View>

      <View style={styles.section}>
        <WhiteText style={styles.heading}>Add a New Document</WhiteText>
        <View style={styles.addDocumentContainer}>
          <ButtonSquareWithIcon
            label="Drivers License"
            onPress={() => {router.navigate("/home/add_document")}}
            icon="car"
          >
            <AntDesign />
          </ButtonSquareWithIcon>
          <ButtonSquareWithIcon
            label="Passport"
            onPress={() => {router.navigate("/home/add_document")}}
            icon="passport"
          >
            <FontAwesome5 />
          </ButtonSquareWithIcon>
          <ButtonSquareWithIcon
            label="Birth Certificate"
            onPress={() => {router.navigate("/home/add_document")}}
            icon="certificate"
          >
            <MaterialCommunityIcons />
          </ButtonSquareWithIcon>
        </View>
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 20,
  },
  noDocumentsFoundText: {
    tintColor: "gray",
    textAlign: "center",
  },
  addDocumentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    paddingBottom: 50,
  },
  yourDocuments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yourDocumentsScrollView: {
    paddingBottom: 10,
  },
});

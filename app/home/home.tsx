import WhiteText from "components/text/white_text";
import { useEffect, useState } from "react";
import { getUsersName } from "lib/asyncStorage";
import { StyleSheet, View } from "react-native";
import Content from "components/wrappers/content";
import { BirthCertificate, DriversLicense, Passport } from "lib/types";
import ButtonSquareWithIcon from "components/buttons/button_square";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { DocTypes } from "lib/types";
import { getAllDocuments } from "lib/api";
import { getToken } from "lib/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppHome() {
  const [name, setName] = useState("");
  const [documents, setDocuments] = useState<
    (Passport | BirthCertificate | DriversLicense)[]
  >([]);

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
      <View style={[styles.welcomeTextContainer, styles.section]}>
        <WhiteText style={styles.welcomeText}>Welcome, {name}</WhiteText>
      </View>
      <View style={styles.section}>
        <WhiteText style={styles.heading}>Your Documents</WhiteText>
        <View style={styles.separator} />
        <View style={styles.yourDocuments}>
          <ScrollView horizontal style={styles.yourDocumentsScrollView}>
            {documents.length ? (
              documents.map((document, index) => {
                // @ts-ignore
                const docData =
                  DocTypes[document.documentType as keyof typeof DocTypes];

                return (
                  <View key={index}>
                    <ButtonSquareWithIcon
                      icon={docData.iconName}
                      label={docData.name}
                      pathname="/home/view_document"
                      data={{ documentId: document.documentId }}
                      style={{ marginLeft: 10 }}
                    >
                      <docData.iconComponent />
                    </ButtonSquareWithIcon>
                  </View>
                );
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

        <View style={styles.separator} />
        <View style={styles.addDocumentContainer}>
          <ButtonSquareWithIcon
            label="Drivers License"
            pathname="/home/add_document"
            data={{ documentType: "DriversLicense" }}
            icon="car"
          >
            <AntDesign />
          </ButtonSquareWithIcon>
          <ButtonSquareWithIcon
            label="Passport"
            pathname="/home/add_document"
            data={{ documentType: "Passport" }}
            icon="passport"
          >
            <FontAwesome5 />
          </ButtonSquareWithIcon>
          <ButtonSquareWithIcon
            label="Birth Certificate"
            pathname="/home/add_document"
            data={{ documentType: "BirthCertificate" }}
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
  },
  noDocumentsFoundText: {
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
  separator: {
    height: 5,
    width: "100%",
    backgroundColor: "#10B3ED",
    marginTop: 5,
    marginBottom: 10,
  },
});

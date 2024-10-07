import Content from "components/wrappers/content";
import { useLocalSearchParams } from "expo-router";
import { getDocument } from "lib/api";
import { getToken } from "lib/asyncStorage";
import {
  BirthCertificate,
  DriversLicense,
  GenericDocument,
  Passport,
} from "lib/types";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

type ViewDocumentParams = {
  documentId: string;
};

export default function ViewDocument() {
  const params = useLocalSearchParams<ViewDocumentParams>();
  const [doc, setDoc] = useState<GenericDocument | null>(null);
  const { documentId } = params;

  if (documentId === undefined) {
    return (
      <Content>
        <Text>Error: no doc id provided</Text>
      </Content>
    );
  }
  useEffect(() => {
    getToken().then((stored_token) => {
      if (stored_token !== null) {
        getDocument(stored_token, parseInt(documentId)).then((docu) => {
          setDoc(docu);
        });
      }
    });
  }, []);

  return (
    <Content>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.imagePlaceholder}>
          <Text style={{ textAlign: "center" }}>Placeholder</Text>
        </View>

        <Text style={{ fontSize: 25 }}>{doc?.documentType}</Text>

        {doc?.documentType === "DriversLicense" && (
          <View>
            <Text>
              Drivers License Number:{" "}
              {(doc as DriversLicense).driversLicenseNumber}
            </Text>

            <Text>Drivers License Class: {(doc as DriversLicense).class}</Text>
          </View>
        )}

        {doc?.documentType === "Passport" && (
          <View>
            <Text>Nationality: {(doc as Passport).nationality}</Text>
            <Text>Authority: {(doc as Passport).authority}</Text>
          </View>
        )}

        {doc?.documentType === "BirthCertificate" && (
          <View>
            <Text>Birth Place: {(doc as BirthCertificate).birthplace}</Text>
            <Text>
              Registration Number:{" "}
              {(doc as BirthCertificate).registrationNumber}
            </Text>
            <Text>Date of Birth: {(doc as BirthCertificate).dateOfBirth}</Text>
          </View>
        )}
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: 200,
    height: 200,
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 20,
    marginBottom: 20,
  },
});

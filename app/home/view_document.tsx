import WhiteText from "components/text/white_text";
import Content from "components/wrappers/content";
import { useLocalSearchParams } from "expo-router";
import { getDocument } from "lib/api";
import { getToken } from "lib/asyncStorage";
import { BirthCertificate, DriversLicense, Passport } from "lib/types";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { DocTypes } from "lib/types";

type ViewDocumentParams = {
  documentId: string;
};

export default function ViewDocument() {
  const params = useLocalSearchParams<ViewDocumentParams>();
  const [doc, setDoc] = useState<
    Passport | BirthCertificate | DriversLicense | null
  >(null);
  const { documentId } = params;

  if (documentId === undefined) {
    return (
      <Content>
        <WhiteText>Error</WhiteText>
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

  console.log(doc);

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
          <WhiteText style={{ textAlign: "center" }}>Placeholder</WhiteText>
        </View>

        <WhiteText style={{ fontSize: 25 }}>{doc?.documentType}</WhiteText>
        <WhiteText>Issue Date: {doc?.issueDate.toString()}</WhiteText>
        <WhiteText>Expiration Date: {doc?.expirationDate.toString()}</WhiteText>
        <WhiteText>Creation Date: {doc?.creationDate}</WhiteText>

        {doc?.documentType === "DriversLicense" && (
          <View>
            <WhiteText>
              Drivers License Number:{" "}
              {(doc as DriversLicense).driversLicenseNumber}
            </WhiteText>

            <WhiteText>
              Drivers License Class: {(doc as DriversLicense).class}
            </WhiteText>
          </View>
        )}

        {doc?.documentType === "Passport" && (
          <View>
            <WhiteText>Nationality: {(doc as Passport).nationality}</WhiteText>
            <WhiteText>Authority: {(doc as Passport).authority}</WhiteText>
          </View>
        )}

        {doc?.documentType === "BirthCertificate" && (
          <View>
            <WhiteText>
              Birth Place: {(doc as BirthCertificate).birthplace}
            </WhiteText>
            <WhiteText>
              Registration Number:{" "}
              {(doc as BirthCertificate).registrationNumber}
            </WhiteText>
            <WhiteText>
              Date of Birth: {(doc as BirthCertificate).dateOfBirth}
            </WhiteText>
          </View>
        )}

        <View
          style={{
            backgroundColor:
              doc?.validationStatus == "Validated" ? "green" : "red",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <WhiteText>
            {doc?.validationStatus == "Validated"
              ? "VALID"
              : "PENDING VALIDATION"}
          </WhiteText>
        </View>
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

import WhiteText from "components/text/white_text";
import { useState } from "react";
import Content from "components/wrappers/content";
import { router, useLocalSearchParams } from "expo-router";
import { DocTypes } from "lib/types";
import { Button, ScrollViewBase, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ButtonLarge from "components/buttons/button_large";
import { createDocument } from "lib/api";
import { getToken } from "lib/asyncStorage";
import Toast from "react-native-root-toast";
type AddDocumentParams = {
  documentType: keyof typeof DocTypes;
};
function PassportView() {
  return (
    <Content>
      <WhiteText>Add Document: Passport [NOT IMPLEMENTED]</WhiteText>
    </Content>
  );
}

function BirthCertificateView() {
  return (
    <Content>
      <WhiteText>Add Document: Birth Certificate [NOT IMPLEMENTED]</WhiteText>
    </Content>
  );
}

function DriversLicenseView() {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [classType, setClassType] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <Content>
      <WhiteText style={styles.heading}>Add Drivers License</WhiteText>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          placeholderTextColor="black"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Height (CM)"
          value={height}
          onChangeText={setHeight}
          placeholderTextColor="black"
          keyboardType="number-pad"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Province"
          value={province}
          onChangeText={setProvince}
          placeholderTextColor="black"
          textContentType="addressState"
        />
        <TextInput
          style={styles.textInput}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="black"
          textContentType="addressCity"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="black"
          textContentType="streetAddressLine1"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          placeholderTextColor="black"
          textContentType="postalCode"
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setClassType(value)}
            placeholder={{ label: "Select Class Type", value: null }}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "black",
                paddingRight: 30,
                width: "100%",
                backgroundColor: "white",
              },
            }}
            items={[
              { label: "G", value: "G" },
              { label: "G1", value: "G1" },
              { label: "G2", value: "G2" },
              { label: "M", value: "M" },
              { label: "M1", value: "M1" },
              { label: "M2", value: "M2" },
            ]}
          />
          <RNPickerSelect
            onValueChange={(value) => setSex(value)}
            placeholder={{ label: "Sex", value: null }}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "black",
                paddingRight: 30,
                width: "100%",
                backgroundColor: "white",
              },
            }}
            items={[
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
            ]}
          />
        </View>

        <View style={styles.compactDate}>
          <View>
            <WhiteText style={{ textAlign: "center" }}>
              Expiration Date
            </WhiteText>
            <DateTimePicker
              testID="dateTimePicker"
              value={expirationDate || new Date()}
              mode="date"
              onChange={(_, selectedDate) => {
                setExpirationDate(selectedDate || null);
              }}
            />
          </View>
          <View>
            <WhiteText style={{ textAlign: "center" }}>Issue Date</WhiteText>
            <DateTimePicker
              testID="dateTimePicker"
              value={issueDate || new Date()}
              mode="date"
              onChange={(_, selectedDate) => {
                setIssueDate(selectedDate || null);
              }}
            />
          </View>
          <View>
            <WhiteText style={{ textAlign: "center" }}>Date of Birth</WhiteText>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth || new Date()}
              mode="date"
              onChange={(_, selectedDate) => {
                setDateOfBirth(selectedDate || null);
              }}
            />
          </View>
        </View>
        <ButtonLarge
          label="Submit"
          style={{ width: "100%", height: 40 }}
          onPress={() => {
            getToken().then((stored_token) => {
              if (stored_token) {
                createDocument(stored_token, {
                  documentId: 0,
                  documentType: "DriversLicense",
                  creationDate: new Date().toISOString(),
                  expirationDate: expirationDate?.toISOString() as string,
                  issueDate: issueDate?.toISOString() as string,
                  validationStatus: "",
                  driversLicenseNumber: licenseNumber,
                  dateOfBirth: dateOfBirth?.toISOString() as string,
                  class: classType,
                  height: Number(height),
                  sex: sex,
                  province: province,
                  city: city,
                  address: address,
                  postalCode: postalCode,
                })
                  .then(() => {
                    router.navigate("/home/home");
                  })
                  .catch((e) => {});
              }
            });
          }}
        />
      </View>
    </Content>
  );
}
export default function AddDocument() {
  const params = useLocalSearchParams<AddDocumentParams>();
  const { documentType } = params;
  switch (documentType) {
    case "Passport":
      return <PassportView />;
    case "BirthCertificate":
      return <BirthCertificateView />;
    case "DriversLicense":
      return <DriversLicenseView />;
  }
  return (
    <Content>
      <WhiteText>Error: No document type selected</WhiteText>
    </Content>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    textAlign: "center",
  },
  textInput: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "white",
    color: "black",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  compactDate: {
    flexDirection: "row",
    paddingTop: 10,
  },
});

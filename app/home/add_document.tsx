import { useState } from "react";
import Content from "components/wrappers/content";
import { router, useLocalSearchParams } from "expo-router";
import {
  BirthCertificate,
  DocTypes,
  DriversLicense,
  Passport,
} from "lib/types";
import { Button, ScrollViewBase, StyleSheet, Text } from "react-native";
import { TextInput, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import ButtonLarge from "components/buttons/button_large";
import { createDocument } from "lib/api";
import { getToken } from "lib/asyncStorage";
import Toast from "react-native-root-toast";
import { Platform } from "react-native";
type AddDocumentParams = {
  documentType: keyof typeof DocTypes;
};

const MOCK_DOCUMENTS: {
  Passport: Passport;
  BirthCertificate: BirthCertificate;
  DriversLicense: DriversLicense;
} = {
  Passport: {
    documentId: 0,
    documentType: "Passport",
    type: "Standard",
    name: "Steve Rogers",
    nationality: "Canadian",
    dateOfBirth: "1990-01-01",
    placeOfBirth: "Toronto",
    authority: "Government of Canada",
  },
  BirthCertificate: {
    documentId: 0,
    documentType: "BirthCertificate",
    name: "Steve Rogers",
    dateOfBirth: "1990-01-01",
    birthplace: "Toronto",
    dateOfRegistrtion: "1990-01-01",
    certificateNumber: "123456",
    sex: "Male",
    registrationNumber: "198283123",
  },
  DriversLicense: {
    documentId: 0,
    documentType: "DriversLicense",
    driversLicenseNumber: "123456",
    dateOfBirth: "1990-01-01",
    class: "G",
    height: "170cm",
    sex: "Male",
    province: "Ontario",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "A1A 1A1",
  },
};

function AddMockData(type: string) {
  getToken().then((stored_token) => {
    if (stored_token) {
      createDocument(
        stored_token,
        MOCK_DOCUMENTS[type as keyof typeof MOCK_DOCUMENTS],
      )
        .then(() => {
          router.navigate("/home/home");
        })
        .catch((e) => {
          Toast.show("Error adding document", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        });
    }
  });
}
function PassportView() {
  return (
    <Content>
      <Text>Add Document: Passport[FORM NOT IMPLEMENTED]</Text>
      <ButtonLarge
        label="Press to add mock data"
        onPress={() => AddMockData("Passport")}
      />
    </Content>
  );
}
function BirthCertificateView() {
  return (
    <Content>
      <Text>Add Document: Birth Certificate[FORM NOT IMPLEMENTED]</Text>
      <ButtonLarge
        label="Press to add mock data"
        onPress={() => AddMockData("BirthCertificate")}
      />
    </Content>
  );
}

function DriversLicenseView() {
  return (
    <Content>
      <Text>Add Document: Drivers License [FORM NOT IMPLEMENTED]</Text>
      <ButtonLarge
        label="Press to add mock data"
        onPress={() => AddMockData("DriversLicense")}
      />
    </Content>
  );
}
// re-implement later
// function DriversLicenseView() {
//   const [expirationDate, setExpirationDate] = useState<Date | null>(null);
//   const [issueDate, setIssueDate] = useState<Date | null>(null);
//   const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [classType, setClassType] = useState("");
//   const [height, setHeight] = useState("");
//   const [sex, setSex] = useState("");
//   const [province, setProvince] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const datePickers = [];
//   if (Platform.OS === "android") {
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Expiration Date</Text>
//         <ButtonLarge
//           label={
//             expirationDate
//               ? expirationDate.toDateString()
//               : "Select Expiration Date"
//           }
//           onPress={() => {
//             DateTimePickerAndroid.open({
//               testID: "dateTimePicker",
//               mode: "date",
//               value: expirationDate || new Date(),
//               onChange: (_, selectedDate) => {
//                 setExpirationDate(selectedDate || null);
//                 DateTimePickerAndroid.dismiss("date");
//               },
//             });
//           }}
//         />
//       </View>,
//     );
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Issue Date</Text>
//         <ButtonLarge
//           label={issueDate ? issueDate.toDateString() : "Select Issue Date"}
//           onPress={() => {
//             DateTimePickerAndroid.open({
//               testID: "dateTimePicker",
//               mode: "date",
//               value: issueDate || new Date(),
//               onChange: (_, selectedDate) => {
//                 setIssueDate(selectedDate || null);
//                 DateTimePickerAndroid.dismiss("date");
//               },
//             });
//           }}
//         />
//       </View>,
//     );
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Date of Birth</Text>
//         <ButtonLarge
//           label={
//             dateOfBirth ? dateOfBirth.toDateString() : "Select Date of Birth"
//           }
//           onPress={() => {
//             DateTimePickerAndroid.open({
//               testID: "dateTimePicker",
//               mode: "date",
//               value: dateOfBirth || new Date(),
//               onChange: (_, selectedDate) => {
//                 setDateOfBirth(selectedDate || null);
//                 DateTimePickerAndroid.dismiss("date");
//               },
//             });
//           }}
//         />
//       </View>,
//     );
//   }

//   if (Platform.OS === "ios") {
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Expiration Date</Text>
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={expirationDate || new Date()}
//           mode="date"
//           onChange={(_, selectedDate) => {
//             setExpirationDate(selectedDate || null);
//           }}
//         />
//       </View>,
//     );
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Issue Date</Text>
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={issueDate || new Date()}
//           mode="date"
//           onChange={(_, selectedDate) => {
//             setIssueDate(selectedDate || null);
//           }}
//         />
//       </View>,
//     );
//     datePickers.push(
//       <View>
//         <Text style={{ textAlign: "center" }}>Date of Birth</Text>
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={dateOfBirth || new Date()}
//           mode="date"
//           onChange={(_, selectedDate) => {
//             setDateOfBirth(selectedDate || null);
//           }}
//         />
//       </View>,
//     );
//   }

//   return (
//     <Content>
//       <Text style={styles.heading}>Add Drivers License</Text>

//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="License Number"
//           value={licenseNumber}
//           onChangeText={setLicenseNumber}
//           placeholderTextColor="black"
//         />

//         <TextInput
//           style={styles.textInput}
//           placeholder="Height (CM)"
//           value={height}
//           onChangeText={setHeight}
//           placeholderTextColor="black"
//           keyboardType="number-pad"
//         />

//         <TextInput
//           style={styles.textInput}
//           placeholder="Province"
//           value={province}
//           onChangeText={setProvince}
//           placeholderTextColor="black"
//           textContentType="addressState"
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="City"
//           value={city}
//           onChangeText={setCity}
//           placeholderTextColor="black"
//           textContentType="addressCity"
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//           placeholderTextColor="black"
//           textContentType="streetAddressLine1"
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Postal Code"
//           value={postalCode}
//           onChangeText={setPostalCode}
//           placeholderTextColor="black"
//           textContentType="postalCode"
//         />
//         <View
//           style={{
//             flexDirection: "row",
//             width: "100%",
//             justifyContent: "space-around",
//           }}
//         >
//           <RNPickerSelect
//             onValueChange={(value) => setClassType(value)}
//             placeholder={{ label: "Select Class Type", value: null }}
//             style={{
//               inputIOS: {
//                 fontSize: 16,
//                 paddingVertical: 12,
//                 paddingHorizontal: 10,
//                 borderRadius: 10,
//                 color: "black",
//                 paddingRight: 30,
//                 width: "100%",
//                 backgroundColor: "white",
//               },
//             }}
//             items={[
//               { label: "G", value: "G" },
//               { label: "G1", value: "G1" },
//               { label: "G2", value: "G2" },
//               { label: "M", value: "M" },
//               { label: "M1", value: "M1" },
//               { label: "M2", value: "M2" },
//             ]}
//           />
//           <RNPickerSelect
//             onValueChange={(value) => setSex(value)}
//             placeholder={{ label: "Sex", value: null }}
//             style={{
//               inputIOS: {
//                 fontSize: 16,
//                 paddingVertical: 12,
//                 paddingHorizontal: 10,
//                 borderRadius: 10,
//                 color: "black",
//                 paddingRight: 30,
//                 width: "100%",
//                 backgroundColor: "white",
//               },
//             }}
//             items={[
//               { label: "Female", value: "Female" },
//               { label: "Male", value: "Male" },
//             ]}
//           />
//         </View>

//         <View style={styles.compactDate}>
//           {datePickers.map((picker, index) => (
//             <View key={index}>{picker}</View>
//           ))}
//         </View>
//         <ButtonLarge
//           label="Submit"
//           style={{ width: "100%", height: 40 }}
//           onPress={() => {
//             getToken().then((stored_token) => {
//               if (stored_token) {
//                 createDocument(stored_token, {
//                   documentId: 0,
//                   documentType: "DriversLicense",
//                   creationDate: new Date().toISOString(),
//                   expirationDate: expirationDate?.toISOString() as string,
//                   issueDate: issueDate?.toISOString() as string,
//                   validationStatus: "",
//                   driversLicenseNumber: licenseNumber,
//                   dateOfBirth: dateOfBirth?.toISOString() as string,
//                   class: classType,
//                   height: Number(height),
//                   sex: sex,
//                   province: province,
//                   city: city,
//                   address: address,
//                   postalCode: postalCode,
//                 })
//                   .then(() => {
//                     router.navigate("/home/home");
//                   })
//                   .catch((e) => {});
//               }
//             });
//           }}
//         />
//       </View>
//     </Content>
//   );
// }
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
      <Text>Error: No document type selected</Text>
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

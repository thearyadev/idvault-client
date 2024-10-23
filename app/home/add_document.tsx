import { ForwardedRef, RefObject, forwardRef, useRef, useState } from "react";
import Content from "components/wrappers/content";
import { router, useLocalSearchParams } from "expo-router";
import {
  BirthCertificate,
  DocTypes,
  DriversLicense,
  GenericDocument,
  Passport,
} from "lib/types";
import {
  Alert,
  Button,
  Pressable,
  ScrollViewBase,
  StyleSheet,
  Text,
} from "react-native";
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
import {
  MOCK_DOCUMENTS,
  DRIVERS_LICENSE_IMAGE,
  PASSPORT_IMAGE,
  BIRTH_CERTIFICATE_IMAGE,
} from "lib/mock";
import { inputStyle } from "components/styles/inputStyle";
import { buttonStyle } from "components/styles/buttonStyle";
import { CameraView, CameraViewRef, useCameraPermissions } from "expo-camera";
import { CameraCapturedPicture } from "expo-camera";
import { BottomSheetMethods } from "@devvie/bottom-sheet/src";
import {
  BirthCertificateSheet,
  DriversLicenceSheet,
  PassportSheet,
} from "components/documentSheets/documentSheets";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import * as Device from "expo-device";
type AddDocumentParams = {
  documentType: keyof typeof DocTypes;
};

interface CameraSelectionViewProps {
  onPictureTaken: (picture: CameraCapturedPicture) => void;
  visible: boolean;
}

const CameraSelectionView = forwardRef<CameraView, CameraSelectionViewProps>(
  (props, ref: ForwardedRef<CameraView>) => {
    const emulator = !Device.isDevice;
    const [permission, requestPermission] = useCameraPermissions();
    if (!permission || !props.visible) {
      return <View />;
    }

    if (!permission.granted) {
      requestPermission();
    }

    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <CameraView ref={ref} facing="back" style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "flex-end", margin: 30 }}>
            <Pressable
              style={buttonStyle.buttonStyle}
              onPress={() => {
                if (!emulator) {
                  // @ts-ignore
                  ref.current
                    ?.takePictureAsync({ base64: true })
                    .then((picture) => {
                      props.onPictureTaken(picture);
                    });
                } else {
                  Alert.alert(
                    "Failed to capture picture",
                    "Camera is not available in emulators. A sample image has been used instead.",
                  );
                  props.onPictureTaken({} as CameraCapturedPicture); // no image
                }
              }}
            >
              <Text style={{ color: "white" }}>Capture</Text>
            </Pressable>
          </View>
        </CameraView>
      </View>
    );
  },
);

function validateInput(input: GenericDocument) {
  for (const key in input) {
    if (key === "image") {
      continue;
    }
    // @ts-ignore
    if (input[key] === "") {
      return false;
    }
  }
  return true;
}

function addDocument(document: GenericDocument) {
  if (!validateInput(document)) {
    Alert.alert("Error", "Please fill out all fields");
    return;
  }

  getToken().then((stored_token) => {
    if (stored_token) {
      createDocument(stored_token, document)
        .then(() => {
          Alert.alert("Success", "Document added successfully");
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

interface DatePickerProps {
  onChange: (newDate: string) => void;
  date: string;
  label: string;
}

function DatePickerLabel(props: DatePickerProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxHeight: 50,
        minHeight: 50,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ padding: 0 }}>{props.label}</Text>
      <DateTimePicker
        value={new Date(props.date)}
        onChange={(event, date) => {
          props.onChange(date?.toISOString()!);
        }}
      />
    </View>
  );
}
function PassportView() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [authority, setAuthority] = useState("");
  const [image, setImage] = useState("");

  const [completedDocument, setCompletedDocument] = useState<Passport | null>(
    null,
  );

  const sheetRef = useRef<BottomSheetMethods>(null);

  const cameraRef = useRef<CameraView>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const onCaptureComplete = (picture: CameraCapturedPicture) => {
    setCameraVisible(false);
    setImage(picture.base64 || "");
  };
  return (
    <>
      <Content>
        <CameraSelectionView
          ref={cameraRef}
          visible={cameraVisible}
          onPictureTaken={onCaptureComplete}
        />
        <Text style={styles.heading}>Passport</Text>
        <TextInput
          placeholder="Type"
          onChangeText={setType}
          style={{ ...inputStyle.input, marginBottom: 10 }}
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Name"
          onChangeText={setName}
          style={{ ...inputStyle.input, marginBottom: 10 }}
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Nationality"
          onChangeText={setNationality}
          style={{ ...inputStyle.input, marginBottom: 10 }}
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Place of Birth"
          onChangeText={setPlaceOfBirth}
          style={{ ...inputStyle.input, marginBottom: 10 }}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Authority"
          onChangeText={setAuthority}
          style={{ ...inputStyle.input, marginBottom: 0 }}
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
        <DatePickerLabel
          date={dateOfBirth == "" ? new Date().toISOString() : dateOfBirth}
          onChange={setDateOfBirth}
          label="Date Of Birth"
        />

        <Pressable
          style={{ ...buttonStyle.buttonStyle, marginTop: 0 }}
          onPress={() => {
            setCameraVisible(true);
          }}
        >
          <Text style={{ color: "white" }}>Capture Image</Text>
        </Pressable>
        <Pressable
          style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
          onPress={() => {
            const newDocument: Passport = {
              documentId: 0,
              documentType: "Passport",
              type: type,
              name: name,
              authority: authority,
              dateOfBirth: dateOfBirth.slice(0, 10),
              placeOfBirth: placeOfBirth,
              image: image,
              nationality: nationality,
            };
            if (!validateInput(newDocument)) {
              Alert.alert("Error", "Please fill out all fields");
              return;
            }
            setCompletedDocument(newDocument);
            sheetRef.current?.open();
          }}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </Pressable>
      </Content>
      <PassportSheet
        sheetRef={sheetRef}
        document={completedDocument}
        confirmationCallback={() => {
          addDocument(completedDocument!);
        }}
      />
    </>
  );
}
function BirthCertificateView() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [sex, setSex] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [image, setImage] = useState("");

  const [completedDocument, setCompletedDocument] =
    useState<BirthCertificate | null>(null);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const cameraRef = useRef<CameraView>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const onCaptureComplete = (picture: CameraCapturedPicture) => {
    setCameraVisible(false);
    setImage(picture.base64 || "");
  };

  return (
    <Content>
      <CameraSelectionView
        ref={cameraRef}
        visible={cameraVisible}
        onPictureTaken={onCaptureComplete}
      />
      <Text style={styles.heading}>Birth Certificate</Text>
      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Birthplace"
        onChangeText={setBirthplace}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Date of Registration"
        onChangeText={setDateOfRegistration}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Certificate Number"
        onChangeText={setCertificateNumber}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Sex"
        onChangeText={setSex}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Registration Number"
        onChangeText={setRegistrationNumber}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />

      <DatePickerLabel
        date={dob == "" ? new Date().toISOString() : dob}
        onChange={setDob}
        label="Date Of Birth"
      />

      <DatePickerLabel
        date={
          dateOfRegistration == ""
            ? new Date().toISOString()
            : dateOfRegistration
        }
        onChange={setDateOfRegistration}
        label="Date of Registration"
      />
      <Pressable
        style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
        onPress={() => {
          setCameraVisible(true);
        }}
      >
        <Text style={{ color: "white" }}>Capture Image</Text>
      </Pressable>

      <Pressable
        style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
        onPress={() => {
          const newDocument: BirthCertificate = {
            documentId: 0,
            documentType: "BirthCertificate",
            name: name,
            dateOfBirth: dob,
            birthplace: birthplace,
            dateOfRegistrtion: dateOfRegistration,
            certificateNumber: certificateNumber,
            sex: sex,
            registrationNumber: registrationNumber,
            image: image,
          };
          if (!validateInput(newDocument)) {
            Alert.alert("Error", "Please fill out all fields");
            return;
          }
          setCompletedDocument(newDocument);
          sheetRef.current?.open();
        }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </Pressable>
      <BirthCertificateSheet
        sheetRef={sheetRef}
        document={completedDocument}
        confirmationCallback={() => {
          addDocument(completedDocument!);
        }}
      />
    </Content>
  );
}

function DriversLicenseView() {
  const [driversLicenseNumber, setDriversLicenseNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [classOfLicense, setClassOfLicense] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState("");

  const [completedDocument, setCompletedDocument] =
    useState<DriversLicense | null>(null);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const cameraRef = useRef<CameraView>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const onCaptureComplete = (picture: CameraCapturedPicture) => {
    setCameraVisible(false);
    setImage(picture.base64 || "");
  };
  return (
    <Content>
      <CameraSelectionView
        ref={cameraRef}
        visible={cameraVisible}
        onPictureTaken={onCaptureComplete}
      />
      <Text style={styles.heading}>Drivers License</Text>
      <TextInput
        placeholder="Drivers License Number"
        onChangeText={setDriversLicenseNumber}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Class of License"
        onChangeText={setClassOfLicense}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Height"
        onChangeText={setHeight}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Sex"
        onChangeText={setSex}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Province"
        onChangeText={setProvince}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="City"
        onChangeText={setCity}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Address"
        onChangeText={setAddress}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />

      <TextInput
        placeholder="Postal Code"
        onChangeText={setPostalCode}
        style={{ ...inputStyle.input, marginBottom: 10 }}
        autoCapitalize="none"
        placeholderTextColor="gray"
      />

      <DatePickerLabel
        date={dateOfBirth == "" ? new Date().toISOString() : dateOfBirth}
        onChange={setDateOfBirth}
        label="Date Of Birth"
      />
      <Pressable
        style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
        onPress={() => {
          setCameraVisible(true);
        }}
      >
        <Text style={{ color: "white" }}>Capture Image</Text>
      </Pressable>
      <Pressable
        style={{ ...buttonStyle.buttonStyle, marginTop: 10 }}
        onPress={() => {
          const newDocument: DriversLicense = {
            documentId: 0,
            documentType: "DriversLicense",
            driversLicenseNumber: driversLicenseNumber,
            dateOfBirth: dateOfBirth,
            class: classOfLicense,
            height: height,
            sex: sex,
            province: province,
            city: city,
            address: address,
            postalCode: postalCode,
            image: image,
          };
          if (!validateInput(newDocument)) {
            Alert.alert("Error", "Please fill out all fields");
            return;
          }
          setCompletedDocument(newDocument);
          sheetRef.current?.open();
        }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </Pressable>

      <DriversLicenceSheet
        sheetRef={sheetRef}
        document={completedDocument}
        confirmationCallback={() => {
          addDocument(completedDocument!);
        }}
      />
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
      <Text>Error: No document type selected</Text>
    </Content>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});

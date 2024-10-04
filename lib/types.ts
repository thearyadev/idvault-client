import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type UserDetails = {
  userId: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
};

export type Token = string;

export interface Document {
  documentId: number;
  documentType: string;
}

export interface Passport extends Document {
  type: string;
  name: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  authority: string;
}

export interface DriversLicense extends Document {
  driversLicenseNumber: string;
  dateOfBirth: string;
  class: string;
  height: string;
  sex: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface BirthCertificate extends Document {
  name: string;
  dateOfBirth: string;
  birthplace: string;
  dateOfRegistrtion: string;
  certificateNumber: string;
  sex: string;
  registrationNumber: string;
}

export type GenericDocument = Passport | DriversLicense | BirthCertificate;

export type DocumentsArray = (Passport | DriversLicense | BirthCertificate)[];

export const DocTypes = {
  Passport: {
    name: "Passport",
    iconName: "passport",
    iconComponent: FontAwesome5,
  },
  BirthCertificate: {
    name: "Birth Certificate",
    iconName: "certificate",
    iconComponent: MaterialCommunityIcons,
  },
  DriversLicense: {
    name: "Drivers License",
    iconName: "car",
    iconComponent: AntDesign,
  },
};

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
  creationDate: string;
  expirationDate: string;
  issueDate: string;
  validationStatus: string;
}

export type Passport = Document & {
  type: string;
  name: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  authority: string;
};

export type DriversLicense = Document & {
  driversLicenseNumber: string;
  dateOfBirth: string;
  class: string;
  height: string;
  sex: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
};

export type BirthCertificate = Document & {
  name: string;
  dateOfBirth: string;
  birthplace: string;
  dateOfRegistrtion: string;
  certificateNumber: string;
  sex: string;
  registrationNumber: string;
};

export type GenericDocument = Passport | DriversLicense | BirthCertificate;

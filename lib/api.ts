import {
  BirthCertificate,
  DocumentsArray,
  DriversLicense,
  GenericDocument,
  Passport,
  Token,
  UserDetails,
} from "./types";
import { setToken } from "./asyncStorage";

const API_URL: string = "https://idvault-server-production.up.railway.app"

export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  const requestBody = new URLSearchParams();
  requestBody.append("username", username);
  requestBody.append("password", password);
  const request = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody.toString(),
  });
  if (!request.ok) {
    return Promise.reject("Failed to login");
  }
  const token = (await request.text()) as Token;
  setToken(token);
  return true;
}
export async function register(
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string,
): Promise<boolean> {
  const requestBody = new URLSearchParams();
  requestBody.append("username", username);
  requestBody.append("password", password);
  requestBody.append("fullname", name);
  requestBody.append("email", email);
  requestBody.append("phone_number", phoneNumber);
  const request = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody.toString(),
  });
  if (!request.ok) {
    return Promise.reject("Failed to register");
  }
  return true;
}

export async function userDetails(token: Token): Promise<UserDetails> {
  const request = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok) {
    return Promise.reject("Failed to get user details");
  }
  return (await request.json()) as UserDetails;
}

export async function getDocument(token: Token, documentId: number): Promise<Passport | BirthCertificate | DriversLicense>  {
  const request = await fetch(`${API_URL}/documents/details/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await request.json()) as Passport | BirthCertificate | DriversLicense;
}

export async function getAllDocuments(token: Token): Promise<DocumentsArray> {
  const request = await fetch(`${API_URL}/documents/document_list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await request.json()) as DocumentsArray;
}

export function deleteDocument(token: Token, documentId: number): boolean {
  throw new Error("Not implemented");
}

export async function createDocument(
  token: Token,
  document: Passport | BirthCertificate | DriversLicense,
) {
  const request = await fetch(
    `${API_URL}/documents/add/${document.documentType}`,
    {
      method: "POST",
      body: JSON.stringify(document),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // unauthorized
  if (request.status === 401) {
    return Promise.reject("Unauthorized");
  }
  // bad request
  if (request.status === 500) {
    return Promise.reject("Bad request");
  }
  if (!request.ok) {
    return Promise.reject("Failed to create document");
  }
}

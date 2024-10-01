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
import { decryptDocument, encryptDocument, generateEncryptionKeys, loadKeys, type KeyPair } from "./encryption";
import forge from "node-forge";

const API_URL: string = "http://192.168.1.11"

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

export async function getDocument(token: Token, documentId: number): Promise<GenericDocument>  {
  const keys = await loadKeys();
    if (!keys) {
      return Promise.reject("Could not load encryption keys");
    }
  const request = await fetch(`${API_URL}/documents/details/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return decryptDocument((await request.json()) as GenericDocument, keys.privateKey);
}

export async function getAllDocuments(token: Token): Promise<DocumentsArray> {

  const keys = await loadKeys();
    if (!keys) {
      return Promise.reject("Could not load encryption keys");
    }
  const request = await fetch(`${API_URL}/documents/document_list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return ((await request.json()) as DocumentsArray).map((encryptedDocument) => {
    return decryptDocument(encryptedDocument, keys.privateKey) 
  });
}

export function deleteDocument(token: Token, documentId: number): boolean {
  throw new Error("Not implemented");
}

export async function createDocument(
  token: Token,
  document: GenericDocument,
) {
  const keys = await loadKeys();
  if (!keys) {
    return Promise.reject("Could not load encryption keys");
  }
  const encryptedDocument = encryptDocument(document, keys.publicKey)
  const request = await fetch(
    `${API_URL}/documents/add/${document.documentType}`,
    {
      method: "POST",
      body: JSON.stringify(encryptedDocument),
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

export async function savePublicKey(publicKey: KeyPair["publicKey"], token: Token) {
  const request = await fetch(`${API_URL}/users/key`, {
    method: "POST",
    body: JSON.stringify({ publicKey: forge.pki.publicKeyToPem(publicKey) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!request.ok) {
    return Promise.reject("Failed to save public key");
  }
}

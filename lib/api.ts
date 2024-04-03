import { GenericDocument, Token, UserDetails } from "./types";

const API_URL: string = "http://192.168.1.160:3000"; // will be changed in production

export async function login(
  username: string,
  password: string,
): Promise<Token> {
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
  return token;
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

export function getDocument(token: Token, documentId: number): GenericDocument {
  throw new Error("Not implemented");
}

export function getAllDocuments(token: Token): GenericDocument[] {
  throw new Error("Not implemented");
}

export function deleteDocument(token: Token, documentId: number): boolean {
  throw new Error("Not implemented");
}

export function createDocument(
  token: Token,
  document: GenericDocument,
): GenericDocument {
  throw new Error("Not implemented");
}

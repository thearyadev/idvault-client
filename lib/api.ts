import { GenericDocument, Token } from "./types";

const API_URL: string = "http://localhost:3000"; // will be changed in production


export function login(): Token {
  throw new Error("Not implemented");
}

export function userDetails(token: Token) {
  throw new Error("Not implemented");
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

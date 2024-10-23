import { GenericDocument } from "./types";
import {
  setPublicKey,
  getPublicKey,
  setPrivateKey,
  getPrivateKey,
  getUsername,
  getToken,
  setUsername,
} from "./asyncStorage";
import forge from "node-forge";
import { userDetails } from "./api";

const SKIP_KEYS = ["documentId", "documentType", "image"];

export type KeyPair = ReturnType<typeof forge.pki.rsa.generateKeyPair>;

export function generateEncryptionKeys(): KeyPair {
  return forge.pki.rsa.generateKeyPair({ bits: 256, e: 0x10001 });
}

export function saveKeys(keyPair: KeyPair, username: string): void {
  setPublicKey(forge.pki.publicKeyToPem(keyPair.publicKey), username);
  setPrivateKey(forge.pki.privateKeyToPem(keyPair.privateKey), username);
}

export async function loadKeys(): Promise<KeyPair | null> {
  let username = await getUsername(); // get username from async storage
  if (!username) {
    const token = await getToken();
    if (!token) {
      return null;
    }

    const user = await userDetails(token);
    setUsername(user.username);
    username = user.username;
  }
  const publicKey = await getPublicKey(username);
  const privateKey = await getPrivateKey(username);
  if (!publicKey || !privateKey) {
    return null;
  }

  return {
    publicKey: forge.pki.publicKeyFromPem(publicKey),
    privateKey: forge.pki.privateKeyFromPem(privateKey),
  };
}

export function encryptText(
  text: string,
  publicKey: KeyPair["publicKey"],
): string {
  const encrypted = publicKey.encrypt(text);
  return encrypted;
}

export function decryptText(
  text: string,
  privateKey: KeyPair["privateKey"],
): string {
  const decrypted = privateKey.decrypt(text);
  return decrypted;
}

export function decryptDocument<T extends GenericDocument>(
  data: T,
  privateKey: KeyPair["privateKey"],
): T {
  const decryptedData: Partial<T> = {};

  for (const key in data) {
    if (typeof data[key] === "string") {
      if (SKIP_KEYS.includes(key)) {
        decryptedData[key] = data[key];
        continue;
      }

      // @ts-ignore
      decryptedData[key] = decryptText(
        // @ts-ignore
        forge.util.decode64(data[key]),
        privateKey,
      );
    }
  }
  decryptedData.documentId = data.documentId;
  // @ts-ignore
  return decryptedData;
}

export function encryptDocument<T extends GenericDocument>(
  data: T,
  publicKey: KeyPair["publicKey"],
): T {
  const encryptedData: Partial<T> = {};

  for (const key in data) {
    if (typeof data[key] === "string") {
      if (SKIP_KEYS.includes(key)) {
        encryptedData[key] = data[key];
        continue;
      }
      // @ts-ignore
      encryptedData[key] = forge.util.encode64(
        // @ts-ignore
        encryptText(data[key], publicKey),
      );
    }
  }
  // @ts-ignore
  return encryptedData;
}

import { GenericDocument } from "./types";
import {KeyPair, RSA} from "react-native-rsa-native"
import { setPublicKey, getPublicKey, setPrivateKey, getPrivateKey } from "./asyncStorage";


async function generateEncryptionKeys(): Promise<KeyPair> {
  return await RSA.generateKeys(2048);
}

function encryptText(text: string, publicKey: string): string {}

function decryptText(text: string, privateKey: string): string {}

function decryptDocument<T extends GenericDocument>(data: T , privateKey: string): T {}

function encryptDocument<T extends GenericDocument>(data: T, publicKey: string): T {}


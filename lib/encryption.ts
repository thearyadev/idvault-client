import { GenericDocument } from "./types";
import { setPublicKey, getPublicKey, setPrivateKey, getPrivateKey } from "./asyncStorage";
import * as Crypto from "expo-crypto";


function generateEncryptionKeys(): { publicKey: string; privateKey: string } {}

function encryptText(text: string, publicKey: string): string {}

function decryptText(text: string, privateKey: string): string {}

function decryptDocument<T extends GenericDocument>(data: T , privateKey: string): T {}

function encryptDocument<T extends GenericDocument>(data: T, publicKey: string): T {}


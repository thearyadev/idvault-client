import { GenericDocument } from "./types";
import { setPublicKey, getPublicKey, setPrivateKey, getPrivateKey } from "./asyncStorage";
import forge from "node-forge"

type KeyPair = ReturnType<typeof forge.pki.rsa.generateKeyPair>

export function generateEncryptionKeys(): KeyPair {
  return forge.pki.rsa.generateKeyPair({bits: 256, e: 0x10001})
}

export function saveKeys(keyPair: KeyPair): void {
  setPublicKey(forge.pki.publicKeyToPem(keyPair.publicKey))
  setPrivateKey(forge.pki.privateKeyToPem(keyPair.privateKey))
}

export async function loadKeys(): Promise<KeyPair | null> {
  const publicKey = await getPublicKey()
  const privateKey = await getPrivateKey()
  if (!publicKey || !privateKey) {
    return null
  }
  return {
    publicKey: forge.pki.publicKeyFromPem(publicKey),
    privateKey: forge.pki.privateKeyFromPem(privateKey)
  }
}

export function encryptText(text: string, publicKey: KeyPair['publicKey']): string {
  const encrypted = publicKey.encrypt(text)
  return encrypted
}

export function decryptText(text: string, privateKey: KeyPair['privateKey']): string {
  const decrypted = privateKey.decrypt(text)
  return decrypted
}

export function decryptDocument<T extends GenericDocument>(data: T , privateKey: KeyPair['privateKey']): T {
  const decryptedData: Partial<T> = {}

  for (const key in data) {
    if (typeof data[key] === 'string') {
      if (key === "documentType"){
        decryptedData[key] = data[key]
        continue
      } 
      // @ts-ignore
      decryptedData[key] = decryptText(forge.util.decode64(data[key]), privateKey)
    }
  }
  decryptedData.documentId = data.documentId
  // @ts-ignore
  return decryptedData
}

export function encryptDocument<T extends GenericDocument>(data: T, publicKey: KeyPair['publicKey']): T {
  const encryptedData: Partial<T> = {}

  for (const key in data) {
    if (typeof data[key] === 'string') {
      if (key === "documentType") {
        encryptedData[key] = data[key]
        continue
      }
      // @ts-ignore
      encryptedData[key] = forge.util.encode64(encryptText(data[key], publicKey))
    }
  }
  console.log(encryptedData)
  // @ts-ignore
  return encryptedData
}


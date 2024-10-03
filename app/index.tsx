import React from "react";
import { Redirect } from "expo-router";
import { generateEncryptionKeys, loadKeys, saveKeys } from "lib/encryption";
import { savePublicKey as savePkServer } from "lib/api";

export default function App() {
  return <Redirect href="/authentication/login" />;
}

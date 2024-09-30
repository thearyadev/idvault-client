import React from 'react';
import { Redirect } from 'expo-router';
import { generateEncryptionKeys, loadKeys, saveKeys } from 'lib/encryption';

export default function App() {
  loadKeys().then((keys) => {
    if (!keys) {
      const newKeys = generateEncryptionKeys()
      saveKeys(newKeys)
    }
  })
  return <Redirect href="/authentication/login" /> 
}

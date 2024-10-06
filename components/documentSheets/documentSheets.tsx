import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet/src";
import { bottomSheetStyles } from "components/styles/bottomSheetStyles";
import { BirthCertificate, DriversLicense, Passport } from "lib/types";
import { ForwardedRef, RefObject, forwardRef } from "react";
import { Text, View } from "react-native";

const DocumentView = forwardRef<BottomSheetMethods, { children: React.ReactNode }>((props, ref: ForwardedRef<BottomSheetMethods>) => {
  return (
    <BottomSheet ref={ref} style={bottomSheetStyles.bottomSheet} height="90%">
      {props.children}
    </BottomSheet>
  );
});

export function DriversLicenceSheet({
  document,
  sheetRef,
}: {
  document: DriversLicense | null;
  sheetRef: RefObject<BottomSheetMethods>;
}) {
  return (
    <DocumentView ref={sheetRef}>
      <Text>Driver's License</Text>
      <Text>Document ID: {document?.documentId}</Text>
    </DocumentView>
  );
}
export function BirthCertificateSheet({
  document,
  sheetRef,
}: {
  document: BirthCertificate | null;
  sheetRef: RefObject<BottomSheetMethods>;
}) {
  return (
    <DocumentView ref={sheetRef}>
      <Text>Birth Certificate</Text>
      <Text>Document ID: {document?.documentId}</Text>
    </DocumentView>
  );
}


export function PassportSheet({
  document,
  sheetRef,
}: {
  document: Passport | null;
  sheetRef: RefObject<BottomSheetMethods>;
}) {
  return (
    <DocumentView ref={sheetRef}>
      <Text>Passport</Text>
      <Text>Document ID: {document?.documentId}</Text>
    </DocumentView>
  );
}

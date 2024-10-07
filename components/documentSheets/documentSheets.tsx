import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet/src";
import { bottomSheetStyles } from "components/styles/bottomSheetStyles";
import { BirthCertificate, DriversLicense, GenericDocument, Passport } from "lib/types";
import { ForwardedRef, RefObject, forwardRef } from "react";
import { Image, Text, View } from "react-native";

const DocumentView = forwardRef<
  BottomSheetMethods,
  { children: React.ReactNode, document: GenericDocument | null}
>((props, ref: ForwardedRef<BottomSheetMethods>) => {
  return (
    <BottomSheet ref={ref} style={bottomSheetStyles.bottomSheet} height="90%">
      {props.children}
      <Image 
        style={{width: 100, height: 50, resizeMode: "contain", borderWidth: 1, borderColor: 'red'}} 
        source={{uri: `data:image/png;base64, ${props.document?.image}`}}/>
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
    <DocumentView ref={sheetRef} document={document}>
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
    <DocumentView ref={sheetRef} document={document}>
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
    <DocumentView ref={sheetRef} document={document}>
      <Text>Passport</Text>
      <Text>Document ID: {document?.documentId}</Text>
    </DocumentView>
  );
}

import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet/src";
import { bottomSheetStyles } from "components/styles/bottomSheetStyles";
import { BirthCertificate, DocTypes, DriversLicense, GenericDocument, Passport } from "lib/types";
import { ForwardedRef, RefObject, forwardRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { buttonStyle } from "components/styles/buttonStyle";

function Cell({ itemKey, value }: { itemKey: string, value?: string }) {
  return (
    <View style={styles.cell}>
      <Text style={styles.cellKey}>{itemKey}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const DocumentView = forwardRef<
  BottomSheetMethods,
  { children: React.ReactNode, document: GenericDocument | null, confirmationCallback?: () => void }
>((props, ref: ForwardedRef<BottomSheetMethods>) => {
  const docData = DocTypes[props.document?.documentType as keyof typeof DocTypes] || null; // can be null if document is undefined. 
  // if document is undefined, then docData will be null.
  // ? must be used for safe access. 
  return (
    <BottomSheet ref={ref} style={{ ...bottomSheetStyles.bottomSheet, padding: 0 }} hideDragHandle height="90%">
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{ uri: `data:image/png;base64, ${props.document?.image}` }} />
        <Pressable style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 20,
        }}
          onPress={() => {
            // @ts-ignore current is always applicable here. 
            ref?.current?.close();
          }}
        >
          <AntDesign name="close" size={24} color="red" />

        </Pressable>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", padding: 10 }}>{docData?.name}</Text>
      <Cell itemKey="ID" value={props.document?.documentId.toString() || ""} />

      {props.children}
      <View style={{ margin: 10, display: props.confirmationCallback ? "flex" : "none" }}>

        <Pressable style={buttonStyle.buttonStyle} onPress={props.confirmationCallback}>
          <Text style={{ color: "white" }}>Confirm</Text>
        </Pressable>

      </View>
    </BottomSheet>
  );
});

export function DriversLicenceSheet({
  document,
  sheetRef,
  confirmationCallback
}: {
  document: DriversLicense | null;
  sheetRef: RefObject<BottomSheetMethods>;
  confirmationCallback?: () => void;
}) {
  return (
    <DocumentView ref={sheetRef} document={document} confirmationCallback={confirmationCallback}>
      <Cell itemKey="class" value={document?.class} />
      <Cell itemKey="sex" value={document?.sex} />
      <Cell itemKey="height" value={document?.height} />
      <Cell itemKey="province" value={document?.province} />
      <Cell itemKey="city" value={document?.city} />
      <Cell itemKey="address" value={document?.address} />
      <Cell itemKey="postal code" value={document?.postalCode} />
    </DocumentView>
  );
}
export function BirthCertificateSheet({
  document,
  sheetRef,
  confirmationCallback
}: {
  document: BirthCertificate | null;
  sheetRef: RefObject<BottomSheetMethods>;
  confirmationCallback?: () => void;
}) {
  return (
    <DocumentView ref={sheetRef} document={document} confirmationCallback={confirmationCallback}>
      <Cell itemKey="name" value={document?.name} />
      <Cell itemKey="date of birth" value={document?.dateOfBirth} />
      <Cell itemKey="birthplace" value={document?.birthplace} />
      <Cell itemKey="date of registration" value={document?.dateOfRegistrtion} />
      <Cell itemKey="certificate number" value={document?.certificateNumber} />
    </DocumentView>
  );
}

export function PassportSheet({
  document,
  sheetRef,
  confirmationCallback
}: {
  document: Passport | null;
  sheetRef: RefObject<BottomSheetMethods>;
  confirmationCallback?: () => void;
}) {
  return (
    <DocumentView ref={sheetRef} document={document} confirmationCallback={confirmationCallback}>
      <Cell itemKey="name" value={document?.name} />
      <Cell itemKey="type" value={document?.type} />
      <Cell itemKey="nationality" value={document?.nationality} />
      <Cell itemKey="date of birth" value={document?.dateOfBirth} />
      <Cell itemKey="place of birth" value={document?.placeOfBirth} />
      <Cell itemKey="authority" value={document?.authority} />
    </DocumentView>
  );
}


const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  cellKey: {
    fontFamily: "courier",
    textTransform: "uppercase",
  }
})

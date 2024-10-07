import { DocTypes, GenericDocument } from "lib/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function DocumentCard({
  document,
  callback,
}: {
  document: GenericDocument;
  callback: () => void;
}) {
  const documentElements =
    DocTypes[document.documentType as keyof typeof DocTypes];

  return (
    <Pressable onPress={callback}>
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.image}>Image</Text>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{documentElements.name}</Text>
            <Text style={styles.cardSubtitle}>
              Document ID: {document.documentId}
            </Text>
          </View>

          <documentElements.iconComponent
            color="black"
            size={38}
            name={documentElements.iconName}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginBottom: 5,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 6,
    // drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  image: {
    width: 60,
  },
  textContainer: {
    flex: 9, // This will take the remaining space
    justifyContent: "center", // Center the text vertically
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "gray",
  },
});

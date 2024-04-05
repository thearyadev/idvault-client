import WhiteText from "components/text/white_text";
import Content from "components/wrappers/content";
import { useLocalSearchParams } from "expo-router";

type ViewDocumentParams = {
  documentId: string;
}

export default function ViewDocument() {
  const params = useLocalSearchParams<ViewDocumentParams>();
  const { documentId } = params;
  return (
    <Content>
      <WhiteText>View Document: {documentId}</WhiteText>
    </Content>
  );
}

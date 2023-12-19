import { DocumentsPage } from "@/features/documents";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Documents = () => {
  useDocumentTitle("Documents | JobsTrackr");

  return <DocumentsPage />;
};

export default Documents;

import { DocumentsPage } from "@/features/documents";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function DocumentsRoute() {
  useDocumentTitle("Documents | JobsTrackr");

  return <DocumentsPage />;
}

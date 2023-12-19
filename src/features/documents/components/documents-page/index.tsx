import { useQuery } from "@tanstack/react-query";

import { useDocumentStore, DocumentUploadModal } from "@/features/documents";
import type { Application } from "@/types/application";
import type { Document } from "@/types/document";
import { DocumentsContent, SharedContent } from "@/features/cms";

import { Card, Icons, Button } from "@/components";
import styles from "./styles.module.scss";

type DocumentsPageProps = {
  groupedDocuments: GroupedDocuments[];
  applications: Application[];
  documents: Document[];
  content: DocumentsContent;
};

type GroupedDocuments = {
  application: Application;
  documents: Document[] | undefined;
};

export const DocumentsPage = () => {
  const { openDocumentModal } = useDocumentStore();

  const { data, error, isLoading } = useQuery<DocumentsContent, Error>({
    queryKey: ["cms-documents"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const data = await fetch("/api/cms/documents");
      return data.json();
    },
  });

  const labels = data?.documentsPage;

  return (
    <section>
      <h1>Documents</h1>
      <Button onClick={() => openDocumentModal()}>
        <Icons.Plus />
        {labels?.addNewDocument}
      </Button>
      <Card
        shadow
        title={labels?.allDocumentsTitle}
        subtitle={labels?.allDocumentsSubtitle}
      >
        <p>test</p>
      </Card>
      <Card
        shadow
        title={`Documents per application`}
        subtitle={`Your documents grouped based on your applications`}
      >
        <p>test</p>
      </Card>
      <DocumentUploadModal applications={[]} />
    </section>
  );
};

import { useQuery } from "@tanstack/react-query";

import { useDocumentStore, DocumentUploadModal } from "@/features/documents";
import type { Application } from "@/types/application";
import type { Document } from "@/types/document";
import { SharedContent } from "@/features/cms";

import { Card, Icons, Button } from "@/components";
import styles from "./styles.module.scss";

type DocumentsPageProps = {
  groupedDocuments: GroupedDocuments[];
  applications: Application[];
  documents: Document[];
};

type GroupedDocuments = {
  application: Application;
  documents: Document[] | undefined;
};

export const DocumentsPage = ({
  documents,
  applications,
  groupedDocuments,
}: DocumentsPageProps) => {
  const { openDocumentModal } = useDocumentStore();

  const { data, error, isLoading } = useQuery<SharedContent, Error>({
    queryKey: ["cms-shared"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const data = await fetch("/api/cms/shared");
      return data.json();
    },
  });

  return (
    <section>
      <Button onClick={() => openDocumentModal()}>
        <Icons.Plus />
        Upload a new document
      </Button>
      <Card
        shadow
        title={`All documents`}
        subtitle={`These are all the documents you've uploaded`}
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
      <DocumentUploadModal applications={applications} />
    </section>
  );
};

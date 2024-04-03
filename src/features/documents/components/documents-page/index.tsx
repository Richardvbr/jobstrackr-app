import {
  useDocumentStore,
  DocumentUploadModal,
  useDocumentsQuery,
  DocumentItem,
} from "@/features/documents";
import { useApplicationsQuery } from "@/features/applications";
import { Card, Icons, Button } from "@/components";
import styles from "./styles.module.scss";
import { Document } from "@/types/document";

export function DocumentsPage() {
  const { openDocumentModal } = useDocumentStore();

  const { data: documentsData } = useDocumentsQuery();
  const { data: applicationsData } = useApplicationsQuery();

  // Group documents based on their corresponding application
  const groupedDocuments = applicationsData?.map((application) => ({
    application: {
      ...application,
    },
    documents: documentsData?.filter((doc) => doc.application_id === application.id),
  }));

  return (
    <section>
      <h1>Documents</h1>
      <Button onClick={() => openDocumentModal()}>
        <Icons.Plus />
        Add a new document
      </Button>
      <div className={styles.documentSections}>
        <Card shadow title='All your documents'>
          <div className={styles.documentContainer}>
            {documentsData?.map((document: Document) => {
              return <DocumentItem key={document.title} document={document} />;
            })}
          </div>
        </Card>
        <Card shadow title='Your documents per application'>
          <p>{JSON.stringify(groupedDocuments)}</p>
        </Card>
      </div>
      <DocumentUploadModal applications={applicationsData ?? []} />
    </section>
  );
}

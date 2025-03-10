import { useApplicationsQuery } from '@/data/application';
import type { Document } from '@/types/document';
import { useDocumentStore } from '@/stores/documentStore';
import { useDocumentsQuery } from '@/data/document';
import { Card, Icons, Button } from '@/components/shared';
import { DocumentItem } from './document';
import { DocumentUploadModal } from './document-upload-modal';
import styles from './styles.module.scss';

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
            {documentsData?.length ? (
              documentsData?.map((document: Document) => (
                <DocumentItem key={document.id} document={document} />
              ))
            ) : (
              <p>No documents yet, any documents you upload will appear here</p>
            )}
          </div>
        </Card>
        <Card shadow title='Your documents per application'>
          {groupedDocuments?.length ? (
            groupedDocuments.map(({ application, documents }) => (
              <div key={application.id} className={styles.groupedDocuments}>
                <p
                  className={styles.applicationName}
                >{`${application.company} - ${application.position}`}</p>
                {documents?.length ? (
                  documents?.map((document: Document) => (
                    <DocumentItem key={document.id} document={document} />
                  ))
                ) : (
                  <p>No documents for this application</p>
                )}
              </div>
            ))
          ) : (
            <p>No documents yet. Documents linked to applications will appear here</p>
          )}
        </Card>
      </div>
      <DocumentUploadModal applications={applicationsData ?? []} />
    </section>
  );
}

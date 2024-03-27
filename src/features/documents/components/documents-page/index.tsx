import { useDocumentStore, DocumentUploadModal, getDocumentsQuery } from "@/features/documents";
import { getApplicationsQuery } from "@/features/applications";
import { Card, Icons, Button } from "@/components";

export function DocumentsPage() {
  const { openDocumentModal } = useDocumentStore();

  const { data: documentsData } = getDocumentsQuery();
  const { data: applicationsData } = getApplicationsQuery();

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
      <Card shadow title='All your documents'>
        {documentsData?.map(({ title, created_at, application_id, file_type }) => {
          return (
            <>
              <p>{title}</p>
              <p>{file_type}</p>
            </>
          );
        })}
        <p>{JSON.stringify(documentsData)}</p>
      </Card>
      <Card shadow title='Your documents per application'>
        <p>{JSON.stringify(groupedDocuments)}</p>
      </Card>
      <DocumentUploadModal applications={applicationsData ?? []} />
    </section>
  );
}

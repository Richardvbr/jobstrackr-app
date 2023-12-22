import {
  useDocumentStore,
  DocumentUploadModal,
  // getDocumentsQuery,
} from "@/features/documents";
import { getDocumentsContentQuery } from "@/features/cms";
import { getApplicationsQuery } from "@/features/applications";
import { Card, Icons, Button } from "@/components";

export const DocumentsPage = () => {
  const { openDocumentModal } = useDocumentStore();

  const { data: labels } = getDocumentsContentQuery();

  // const { data: documentsData } = getDocumentsQuery();
  const { data: applicationsData } = getApplicationsQuery();

  // Group documents based on their corresponding application
  // const groupedDocuments = applicationsData?.map((application) => ({
  //   application: {
  //     ...application,
  //   },
  //   documents: documentsData?.filter(
  //     (doc) => doc.application_id === application.id
  //   ),
  // }));

  return (
    <section>
      <h1>{labels?.title}</h1>
      <Button onClick={() => openDocumentModal()}>
        <Icons.Plus />
        {labels?.addNewDocument}
      </Button>
      <Card shadow title={labels?.allDocumentsTitle}>
        <p>Placeholder</p>
      </Card>
      <Card shadow title={`Documents per application`}>
        <p>Placeholder</p>
      </Card>

      <DocumentUploadModal applications={applicationsData ?? []} />
    </section>
  );
};

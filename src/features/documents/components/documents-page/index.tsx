import { useTranslation } from "react-i18next";

import {
  useDocumentStore,
  DocumentUploadModal,
  // getDocumentsQuery,
} from "@/features/documents";
import { getApplicationsQuery } from "@/features/applications";
import { Card, Icons, Button } from "@/components";

export function DocumentsPage() {
  const { openDocumentModal } = useDocumentStore();
  const { t } = useTranslation();

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
      <h1>{t("documents.title")}</h1>
      <Button onClick={() => openDocumentModal()}>
        <Icons.Plus />
        {t("documents.newDocument")}
      </Button>
      <Card shadow title={t("documents.allYourDocuments")}>
        <p>Placeholder</p>
      </Card>
      <Card shadow title={t("documents.allYourGroupedDocuments")}>
        <p>Placeholder</p>
      </Card>
      <DocumentUploadModal applications={applicationsData ?? []} />
    </section>
  );
}

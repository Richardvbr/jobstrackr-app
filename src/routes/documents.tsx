import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { DocumentsPage } from '@/components/documents';

export function DocumentsRoute() {
  useDocumentTitle('Documents | JobsTrackr');

  return <DocumentsPage />;
}

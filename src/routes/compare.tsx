import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ComparePage } from '@/components/compare';

export function CompareRoute() {
  useDocumentTitle('Compare | JobsTrackr');

  return <ComparePage />;
}

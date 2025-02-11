import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ComparePage } from '@/components/compare/compare-page';

export function CompareRoute() {
  useDocumentTitle('Compare | JobsTrackr');

  return <ComparePage />;
}

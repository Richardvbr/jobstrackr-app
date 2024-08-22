import { ComparePage } from '@/features/compare/compare-page';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function CompareRoute() {
  useDocumentTitle('Compare | JobsTrackr');

  return <ComparePage />;
}

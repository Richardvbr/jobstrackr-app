import { ComparePage } from '@/features/compare/components/compare-page';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function CompareRoute() {
  useDocumentTitle('Compare | JobsTrackr');

  return <ComparePage />;
}

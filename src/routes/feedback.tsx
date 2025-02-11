import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { FeedbackPage } from '@/components/feedback';

export function FeedbackRoute() {
  useDocumentTitle('Feedback | JobsTrackr');

  return <FeedbackPage />;
}

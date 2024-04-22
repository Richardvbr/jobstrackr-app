import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FeedbackPage } from "@/features/feedback/components/feedback-page";

export function FeedbackRoute() {
  useDocumentTitle("Feedback | JobsTrackr");

  return <FeedbackPage />;
}

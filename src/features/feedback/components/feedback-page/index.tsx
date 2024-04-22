import { Card } from "@/components";
import { FeedbackForm } from "@/features/feedback";

export function FeedbackPage() {
  return (
    <section>
      <h1>Feedback</h1>
      <Card title='Submit this form to leave feedback'>
        <FeedbackForm />
      </Card>
    </section>
  );
}

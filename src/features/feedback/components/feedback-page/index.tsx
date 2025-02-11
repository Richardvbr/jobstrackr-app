import { Card } from '@/components/shared';
import { FeedbackForm } from '@/features/feedback';

export function FeedbackPage() {
  return (
    <section>
      <h1>Feedback</h1>
      <Card title='Submit this form to leave feedback' shadow>
        <FeedbackForm />
      </Card>
    </section>
  );
}

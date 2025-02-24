import { Card } from '@/components/shared';
import { FeedbackForm } from './feedback-form';
import styles from './styles.module.scss';

export function FeedbackPage() {
  return (
    <section>
      <h1>Feedback</h1>
      <Card title='Submit this form to leave feedback' shadow className={styles.feedbackForm}>
        <FeedbackForm />
      </Card>
    </section>
  );
}

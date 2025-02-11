import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AuthForm } from '@/components/shared';

export function SignUpRoute() {
  useDocumentTitle('Sign up | JobsTrackr');

  return <AuthForm type='sign-up' />;
}

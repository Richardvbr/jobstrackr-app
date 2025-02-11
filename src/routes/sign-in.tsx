import { AuthForm } from '@/components/shared';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function SignInRoute() {
  useDocumentTitle('Sign in | JobsTrackr');

  return <AuthForm type='sign-in' />;
}

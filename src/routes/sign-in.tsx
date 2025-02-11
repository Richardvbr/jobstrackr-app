import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AuthForm } from '@/components/shared';

export function SignInRoute() {
  useDocumentTitle('Sign in | JobsTrackr');

  return <AuthForm type='sign-in' />;
}

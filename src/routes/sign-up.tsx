import { AuthForm } from "@/components";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SignUpRoute() {
  useDocumentTitle("Sign up | JobsTrackr");

  return <AuthForm type='sign-up' />;
}

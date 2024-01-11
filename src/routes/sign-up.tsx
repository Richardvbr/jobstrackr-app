import { AuthForm } from "@/components";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRouterState } from "@tanstack/react-router";

export function SignUpRoute() {
  useDocumentTitle("Sign up | JobsTrackr");

  return <AuthForm type='sign-up' />;
}

import { AuthForm } from "@/components";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SignIn = () => {
  useDocumentTitle("Sign in | JobsTrackr");

  return <AuthForm type='sign-in' />;
};

export default SignIn;

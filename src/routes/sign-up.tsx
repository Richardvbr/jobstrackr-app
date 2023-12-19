import { AuthForm } from "@/components";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SignUp = () => {
  useDocumentTitle("Sign up | JobsTrackr");

  return <AuthForm type='sign-up' />;
};

export default SignUp;

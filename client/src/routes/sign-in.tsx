import supabase from "@/lib/supabase";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const guestEmail = "guest.be4e3dfc.d8c6@gmail.com";
  const guestPassword = "r4nd0ms3cur3pw";

  const handleGuestLogin = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email: guestEmail,
        password: guestPassword,
      });
    } catch (error) {
      console.log(error);
    } finally {
      <Navigate to='/dashboard' replace state={{ from: location }} />;
    }
  };

  const handleLogout = async () => {
    supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={handleGuestLogin}>Sign in as guest</button>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default SignInPage;

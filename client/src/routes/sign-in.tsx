import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const guestEmail = "guest.be4e3dfc.d8c6@gmail.com";
  const guestPassword = "r4nd0ms3cur3pw";
  const [userData, setUserData] = useState<any>();

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

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserData(data);
      console.log(data);
    };

    getSession();
  }, []);

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={handleGuestLogin}>Sign in as guest</button>
      <pre>{JSON.stringify(userData)}</pre>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default SignInPage;

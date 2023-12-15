import supabaseBrowserClient from "@/lib/supabase";
import { useEffect, useState } from "react";

const useUser = () => {
  const supabase = supabaseBrowserClient();
  const [userData, setUserData] = useState<any>("");

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await supabase.auth.getSession();

        if (session.data) {
          setUserData(session.data.session?.user);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getSession();
  }, [supabase]);

  return userData;
};

export default useUser;

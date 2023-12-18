import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useSession = () => {
  const [sessionData, setSessionData] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await supabase.auth.getSession();

        if (session.data) {
          setSessionData(session.data.session);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getSession();
  }, []);

  return sessionData;
};

export default useSession;

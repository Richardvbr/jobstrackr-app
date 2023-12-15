import Image from "next/image";
import cn from "clsx";

import supabaseBrowserClient from "@/lib/supabase";
import { Provider } from "@supabase/supabase-js/dist/module";
import { capitalizeFirstLetter } from "@/utils/text";
import styles from "./styles.module.scss";

type ThirdPartyProviderProps = {
  provider: Provider;
};

const ThirdPartyProvider = ({ provider }: ThirdPartyProviderProps) => {
  const supabase = supabaseBrowserClient();
  const providerName = capitalizeFirstLetter(provider);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
  };

  const providerClasses = cn([styles.thirdPartyProvider], {
    [styles.google]: provider === "google",
    [styles.discord]: provider === "discord",
  });

  return (
    <div onClick={handleSignIn} className={providerClasses}>
      <div className={styles.logo}>
        <Image
          src={`/assets/images/${provider}.svg`}
          alt={`${providerName} logo`}
          fill
        />
      </div>
      <span>{`Continue with ${providerName}`}</span>
    </div>
  );
};

export default ThirdPartyProvider;

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";
import { ThirdPartyProvider, Button, Input } from "@/components";
import styles from "./styles.module.scss";
import { useUser } from "@/contexts/AuthContext";

type AuthFormProps = {
  type: "sign-up" | "sign-in";
};

type AuthFormInput = {
  username: string;
  email: string;
};

export function AuthForm({ type }: AuthFormProps) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<string | null>(null);
  const formMethods = useForm<AuthFormInput>();
  const navigate = useNavigate();

  const { handleSubmit, register } = formMethods;

  const isSignInform = type === "sign-in";

  const guestEmail = "guest.be4e3dfc.d8c6@gmail.com";
  const guestPassword = "r4nd0ms3cur3pw";

  const user = useUser();

  // Form submission
  async function submitSignIn(formData: AuthFormInput) {
    setLoading(true);

    try {
      await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: import.meta.env.VITE_OTP_EMAIL_REDIRECT,
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      // setError(
      //   "Failed to sign in. Please check your email address and password."
      // );
    } finally {
      setLoading(false);
      setEmailSent("Check your email on this device for a single-use link to sign in.");
    }
  }

  async function handleGuestSignIn() {
    try {
      setLoading(true);
      await supabase.auth.signInWithPassword({
        email: guestEmail,
        password: guestPassword,
      });
    } catch {
      setLoading(false);
      setError("Failed to sign in as guest.");
    } finally {
      if (user) {
        navigate({ to: "/dashboard" });
      }
    }
  }

  function getButtonLabel() {
    if (loading) {
      return "Loading...";
    }

    if (emailSent) {
      return "Email sent!";
    }

    if (isSignInform) {
      return "Sign in";
    }

    return "Sign up";
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <img src={`/assets/images/logo_cropped_transparent.svg`} alt='Jobstrackr logo' />
        <p>Sign in to start managing your job search.</p>
      </div>
      <div className={styles.providers}>
        <ThirdPartyProvider provider='google' />
        <ThirdPartyProvider provider='discord' />
      </div>
      <div className={styles.divider}>Or</div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitSignIn)}>
          {error && <p className={styles.error}>{error}</p>}
          {emailSent && <p className={styles.notification}>{emailSent}</p>}
          <Input
            type='email'
            label='Email *'
            autoComplete='email'
            disabled={loading || !!emailSent}
            {...register("email", { required: true })}
          />
          <Button variant='primary' type='submit' disabled={loading || !!emailSent} fullWidth>
            {getButtonLabel()}
          </Button>
        </form>
      </FormProvider>
      <p className={styles.otp}>
        * JobsTrackr uses passwordless sign-in, meaning a single-use link will be sent to your email
        address. Clicking the link will sign you in and redirect you to JobsTrackr.
      </p>
      <button onClick={handleGuestSignIn} disabled={loading} className={styles.guestSignIn}>
        Continue as guest
      </button>
    </div>
  );
}

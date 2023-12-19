import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import supabase from "@/lib/supabase";
import { ThirdPartyProvider, Button, Input } from "@/components";
import styles from "./styles.module.scss";

type AuthFormProps = {
  type: "sign-up" | "sign-in";
};

type AuthFormInput = {
  username: string;
  email: string;
};

// Refactor to use react-hook-form
const AuthForm = ({ type }: AuthFormProps) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<string>("");
  const formMethods = useForm<AuthFormInput>();
  const navigate = useNavigate();

  const { handleSubmit, register } = formMethods;

  const isLoginForm = type === "sign-in";

  const guestEmail = "guest.be4e3dfc.d8c6@gmail.com";
  const guestPassword = "r4nd0ms3cur3pw";

  // Form submission
  const submitLogin: SubmitHandler<AuthFormInput> = async (formData) => {
    setLoading(true);

    try {
      await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: "http://localhost:3000/dashboard",
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(
        "Failed to login. Please check your email address and password."
      );
    } finally {
      setLoading(false);
      setEmailSent(
        "Check your email on this device for a single-use link to sign in."
      );
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithPassword({
        email: guestEmail,
        password: guestPassword,
      });
    } catch {
      setLoading(false);
      setError("Failed to login as guest.");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <img
          src={`/assets/images/logo_cropped_transparent.svg`}
          alt='Jobstrackr logo'
        />
        <p>Sign in to start managing your job search.</p>
      </div>
      <div className={styles.providers}>
        <ThirdPartyProvider provider='google' />
        <ThirdPartyProvider provider='discord' />
      </div>
      <div className={styles.divider}>Or</div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitLogin)}>
          {error && <p className={styles.error}>{error}</p>}
          {emailSent && <p className={styles.notification}>{emailSent}</p>}
          <Input
            type='email'
            label='Email *'
            autoComplete='email'
            disabled={loading || !!emailSent}
            {...register("email", { required: true })}
          />
          <Button
            variant='primary'
            type='submit'
            disabled={loading || !!emailSent}
            fullWidth
          >
            {loading
              ? "Loading..."
              : emailSent
              ? "Check your email"
              : isLoginForm
              ? "Sign in"
              : "Sign up"}
          </Button>
        </form>
      </FormProvider>
      <p className={styles.otp}>
        * JobsTrackr uses passwordless sign in, meaning a single-use link will
        be sent to your email adress. Clicking the link will sign you in and
        redirect you to JobsTrackr.
      </p>
      <button
        onClick={handleGuestLogin}
        disabled={loading}
        className={styles.guestLogin}
      >
        Continue as guest
      </button>
    </div>
  );
};

export default AuthForm;

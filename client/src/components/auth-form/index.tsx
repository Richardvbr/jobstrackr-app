import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import supabase from "@/lib/supabase";
import { ThirdPartyProvider, Button, Input } from "@/components";
import styles from "./styles.module.scss";

type AuthFormProps = {
  type: "sign-up" | "sign-in";
};

type AuthFormInput = {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

// Refactor to use react-hook-form
const AuthForm = ({ type }: AuthFormProps) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const formMethods = useForm<AuthFormInput>();

  const { handleSubmit, reset, register } = formMethods;

  const isLoginForm = type === "sign-in";

  const guestEmail = "guest.be4e3dfc.d8c6@gmail.com";
  const guestPassword = "r4nd0ms3cur3pw";

  // Form submission
  const submitLogin: SubmitHandler<AuthFormInput> = async (formData) => {
    setLoading(true);

    try {
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(
        "Failed to login. Please check your email address and password."
      );
    } finally {
      reset();
      setLoading(false);
    }
  };

  const submitSignup: SubmitHandler<AuthFormInput> = async (formData) => {
    setLoading(true);

    if (!formData.email) {
      setLoading(false);
      return setError(
        "Email address can't be empty. Please enter a valid email address."
      );
    }

    if (!formData.password || !formData.passwordConfirm) {
      setLoading(false);
      return setError(
        "Password can't be empty, please use at least 7 characters."
      );
    }

    if (formData.password !== formData.passwordConfirm) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    try {
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Failed to create an account");
    } finally {
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      reset();
      setLoading(false);
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
        <form onSubmit={handleSubmit(isLoginForm ? submitLogin : submitSignup)}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            type='email'
            label='Email'
            autoComplete='email'
            {...register("email", { required: true })}
          />
          <Input
            type='password'
            label='Password'
            autoComplete='new-password'
            {...register("password", { required: true, minLength: 7 })}
          />
          {!isLoginForm && (
            <Input
              type='password'
              label='Confirm password'
              autoComplete='new-password'
              {...register("passwordConfirm", { required: true })}
            />
          )}
          <Button variant='primary' type='submit' disabled={loading} fullWidth>
            {loading ? "Loading..." : isLoginForm ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </FormProvider>
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

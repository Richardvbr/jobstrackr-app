import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

import { Button, Input, Textarea } from '@/components';
import styles from './styles.module.scss';

interface FeedbackForm {
  userName: string;
  userEmail: string;
  userMessage: string;
}

export function FeedbackForm() {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const formMethods = useForm<FeedbackForm>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    disabled: submitLoading,
  });
  const { handleSubmit, reset } = formMethods;

  const onSubmit: SubmitHandler<FeedbackForm> = async (formData) => {
    setSubmitLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData as any,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PK,
        }
      )
      .then(() => {
        toast.success('Feedback sent!');
        reset();
      })
      .catch((error) => {
        console.error(error);
        throw toast.error('An error occurred while submitting the form');
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input type='text' label='Name' disabled={submitLoading} name='userName' required />
        <Input
          type='email'
          label='Email'
          autoComplete='email'
          disabled={submitLoading}
          name='userEmail'
          required
        />
        <Textarea name='userMessage' label='Message' disabled={submitLoading} required />
        <Button variant='primary' type='submit' fullWidth disabled={submitLoading}>
          Send
        </Button>
      </form>
    </FormProvider>
  );
}

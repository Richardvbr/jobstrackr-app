import { Fragment, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useUser } from '@/contexts/AuthContext';
import { useApplicationActions } from './actions';
import { useApplicationStore } from '@/stores/applicationStore';
import {
  formItems,
  statusInput,
  workModelInput,
  employmentTypeInput,
  currencyInput,
} from './formItems';
import { Input, SelectInput, Button } from '@/components/shared';
import type { Application } from '@/types/application';
import styles from './styles.module.scss';

type ApplicationForm = {
  handleCloseForm: (askConfirm?: boolean) => void;
};

export function ApplicationForm({ handleCloseForm }: ApplicationForm) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const user = useUser();
  const queryClient = useQueryClient();

  const { applicationData, isEditing } = useApplicationStore(
    useShallow((state) => ({
      applicationData: state.activeApplication,
      isEditing: state.applicationModalOpened === 'edit',
    }))
  );

  const { addNewApplication, updateApplication, deleteApplication } = useApplicationActions();

  // If editing, set activeApplication as defaultValues
  const formMethods = useForm<Application>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: isEditing
      ? {
          ...applicationData,
          applied_at: format(new Date(applicationData?.applied_at as string), 'yyyy-MM-dd'),
        }
      : {},
  });

  const { handleSubmit, reset } = formMethods;

  function handleFormReset() {
    reset();
    setSubmitLoading(false);
    handleCloseForm(false);

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['get-applications'] });
    }, 500);
  }

  // Form submission
  const onSubmit: SubmitHandler<Application> = (applicationForm) => {
    setSubmitLoading(true);

    if (!user) {
      throw new Error('No valid user found.');
    }

    try {
      isEditing ? updateApplication(applicationForm) : addNewApplication(applicationForm);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      handleFormReset();
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItems}>
          {formItems.map(({ label, name, type, required }, index) => (
            <Fragment key={name}>
              {index === 5 && <SelectInput item={currencyInput} />}
              <div className={styles.inputContainer}>
                <Input
                  label={label}
                  name={name}
                  type={type}
                  placeholder={label}
                  required={required}
                />
              </div>
            </Fragment>
          ))}
          <SelectInput item={statusInput} />
          <SelectInput item={workModelInput} />
          <SelectInput item={employmentTypeInput} />
        </div>
        <div className={styles.buttons}>
          <Button disabled={submitLoading} type='submit'>
            {isEditing ? 'Edit application' : 'Add application'}
          </Button>
          <Button
            disabled={submitLoading}
            variant='secondary'
            type='button'
            onClick={() => handleCloseForm(true)}
          >
            Cancel
          </Button>
          {isEditing && (
            <Button
              variant='danger'
              type='button'
              onClick={() => deleteApplication(applicationData as Application, handleFormReset)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

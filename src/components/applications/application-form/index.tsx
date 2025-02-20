import { Fragment, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useUser } from '@/contexts/AuthContext';

import type { Application } from '@/types/application';
import { useApplicationStore } from '@/stores/applicationStore';
import {
  useDeleteApplicationMutation,
  useNewApplicationMutation,
  useUpdateApplicationMutation,
} from '@/data/application';
import {
  formItems,
  statusInput,
  workModelInput,
  employmentTypeInput,
  currencyInput,
} from './formItems';
import { Input, SelectInput, Button } from '@/components/shared';
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

  const { mutate: updateApplicationMutation, error: updateApplicationError } =
    useUpdateApplicationMutation(applicationData?.id as string);

  const { mutate: newApplicationMutation, error: newApplicationError } = useNewApplicationMutation(
    applicationData?.id as string
  );

  const { mutate: deleteApplicationMutation, error: deleteApplicationError } =
    useDeleteApplicationMutation(applicationData?.id as string);

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
    queryClient.invalidateQueries({ queryKey: ['get-applications'] });
  }

  function handleError(error: unknown) {
    console.error('Error submitting form:', error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred.');
    }
  }

  // Form submission
  const onSubmit: SubmitHandler<Application> = async (applicationForm) => {
    setSubmitLoading(true);

    if (!user) {
      throw new Error('No valid user found.');
    }

    try {
      if (isEditing) {
        await updateApplication(applicationForm);
      } else {
        await addNewApplication(applicationForm);
      }
    } catch (error) {
      handleError(error);
    } finally {
      handleFormReset();
    }
  };

  async function updateApplication(application: Application) {
    updateApplicationMutation(application);

    if (updateApplicationError) {
      throw toast.error('An error occurred when updating the application.');
    }

    toast.success('Application updated');
  }

  async function addNewApplication(application: Application) {
    newApplicationMutation(application);

    if (newApplicationError) {
      throw toast.error('An error occurred when updating the application.');
    }

    toast.success('Application added');
  }

  async function deleteApplication(applicationData: Application) {
    // Prevent deleting demo data
    const { id } = applicationData;

    if (
      id === '0cfad3f0-0375-426c-b635-86e134993ade' ||
      id === '07c14adf-33bb-4ecb-9aff-39a5dbe1751c' ||
      id === '1675cad0-41d4-429a-97a9-c7964ea4692e'
    ) {
      return toast.error('Guest demo data cannot be deleted.');
    }

    const close = confirm(
      'Are you sure you want to delete this application? This action cannot be undone.'
    );

    if (!close) {
      return;
    }

    try {
      deleteApplicationMutation();

      if (deleteApplicationError) {
        throw toast.error('An error occured when deleting the application.');
      }

      toast.success('Application deleted');
    } catch (error) {
      handleError(error);
    } finally {
      handleFormReset();
    }
  }

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
              onClick={() => deleteApplication(applicationData as Application)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

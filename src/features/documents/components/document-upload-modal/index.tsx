import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import type { Application } from '@/features/applications';
import type { SelectInputItem } from '@/types/elements';
import { Modal, Input, Button, SelectInput } from '@/components';
import { useDocumentStore, useNewDocumentMutation } from '@/features/documents';
import styles from './styles.module.scss';

interface DocumentUploadModalProps {
  applications: Application[];
}

interface AddDocumentForm {
  documentName: string;
  documentDescription?: string;
  file: File[];
  selectedApplication?: string;
}

export function DocumentUploadModal({ applications }: DocumentUploadModalProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const formMethods = useForm<AddDocumentForm>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    disabled: submitLoading,
  });
  const { documentModalOpened, closeDocumentModal } = useDocumentStore();
  const queryClient = useQueryClient();
  const { handleSubmit, reset } = formMethods;

  const { mutate: newDocumentMutation, error: newDocumentError } = useNewDocumentMutation('');

  const applicationSelect: SelectInputItem = {
    name: 'selectedApplication',
    label: 'Select an application (optional)',
    options: [
      { label: 'Select an option', value: '' },
      ...applications.map(({ id, company, position }) => ({
        value: id,
        label: `${company} - ${position}`,
      })),
    ],
  };

  // Form submission
  const onSubmit: SubmitHandler<AddDocumentForm> = async (formData) => {
    setSubmitLoading(true);
    const { documentName, selectedApplication, documentDescription } = formData;
    const file = formData.file[0];

    const body = {
      documentName,
      documentDescription,
      selectedApplication,
      file,
    };

    try {
      newDocumentMutation(body);

      if (newDocumentError) {
        throw toast.error('An error occurred while uploading the file');
      }

      toast.success('Document uploaded!');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      reset();
      closeDocumentModal();
      queryClient.invalidateQueries({
        queryKey: ['get-applications'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });
    }
  };

  // Reset form on modal visiblity change
  useEffect(() => {
    reset();
  }, [documentModalOpened]);

  return (
    <Modal
      opened={documentModalOpened}
      handleClose={() => closeDocumentModal()}
      modalTitle='Upload a new document'
    >
      <FormProvider {...formMethods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input label='Document name' name='documentName' required />
          <Input label='Document description' name='documentDescription' />
          <Input
            label='Select a file'
            type='file'
            accept='application/msword, application/docx, application/pdf'
            name='file'
            required
            requiredMsg='Please select a file'
          />
          <SelectInput item={applicationSelect} />
          <div className={styles.buttons}>
            <Button type='submit'>Upload document</Button>
            <Button variant='secondary' type='button' onClick={() => closeDocumentModal()}>
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

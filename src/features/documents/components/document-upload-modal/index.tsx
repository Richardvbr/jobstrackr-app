import { type ChangeEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import type { Application } from "@/types/application";
import type { SelectInputItem } from "@/types/elements";

import { Modal, Input, Button, SelectInput, FilePreview } from "@/components";
import { useDocumentStore } from "@/features/documents";
import styles from "./styles.module.scss";

type DocumentUploadModalProps = {
  applications: Application[];
};

export function DocumentUploadModal({ applications }: DocumentUploadModalProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const formMethods = useForm<any>();
  const { documentModalOpened, closeDocumentModal } = useDocumentStore();
  const queryClient = useQueryClient();

  const { handleSubmit, reset } = formMethods;

  const applicationSelect: SelectInputItem = {
    name: "select-application",
    label: "Select an application (optional)",
    options: [
      { label: "None", value: undefined },
      ...applications.map(({ id, company, position }) => ({
        value: id,
        label: `${company} - ${position}`,
      })),
    ],
  };

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  }

  // Form submission
  const onSubmit: SubmitHandler<any> = async (formData) => {
    setSubmitLoading(true);
    console.log(formData);

    try {
      console.log("Submitting...");
      toast.success(`Your document was uploaded!`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      reset();
      closeDocumentModal();
      queryClient.invalidateQueries({
        queryKey: ["get-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-documents"],
      });
    }
  };

  // Reset form on modal close
  useEffect(() => {
    setSelectedFile(undefined);
    reset();
  }, [documentModalOpened]);

  return (
    <Modal
      opened={documentModalOpened}
      handleClose={() => closeDocumentModal()}
      modalTitle={`Upload a new document`}
    >
      <FormProvider {...formMethods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input name='document-name' label='Document name' required />
          <Input
            name='document-file-select'
            label='Select a file'
            type='file'
            onChange={handleFileSelect}
            required
          />
          {selectedFile && <FilePreview file={selectedFile} />}

          <SelectInput item={applicationSelect} />
          <div className={styles.buttons}>
            <Button disabled={submitLoading} type='submit'>
              Upload document
            </Button>
            <Button
              disabled={submitLoading}
              variant='secondary'
              type='button'
              onClick={() => closeDocumentModal()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import type { Application } from "@/types/application";
import type { SelectInputItem } from "@/types/elements";

import { Modal, Input, Button, SelectInput } from "@/components";
import { useDocumentStore } from "@/features/documents";
import styles from "./styles.module.scss";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/contexts/AuthContext";

type DocumentUploadModalProps = {
  applications: Application[];
};

export function DocumentUploadModal({ applications }: DocumentUploadModalProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const formMethods = useForm<any>();
  const user = useUser();
  const { documentModalOpened, closeDocumentModal } = useDocumentStore();
  const queryClient = useQueryClient();
  const { handleSubmit, reset, register } = formMethods;

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

  // Form submission
  const onSubmit: SubmitHandler<any> = async (formData) => {
    setSubmitLoading(true);
    const { "document-name": fileName, "select-application": applicationId = null } = formData;
    const file = formData.file[0];
    const uniqueId = uuidv4();

    try {
      // Upload file
      const { data: fileData, error: fileError } = await supabase.storage
        .from("documents")
        .upload(`file-${fileName}-${uniqueId}`, file);

      if (fileError) {
        setSubmitLoading(false);
        toast.error("File upload failed");
      }

      // Create record
      const { error } = await supabase.from("documents").insert({
        user_id: user?.id,
        title: fileName,
        application_id: applicationId,
        document_path: fileData?.path,
      });

      if (error) {
        setSubmitLoading(false);
        toast.error(error.message);
      }
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

  // Reset form on modal visiblity change
  useEffect(() => {
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
          <Input label='Document name' {...register("document-name", { required: true })} />
          <Input
            label='Select a file'
            type='file'
            accept='.doc, .docx, .pdf'
            {...register("file", { required: true })}
          />
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

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import type { Application } from "@/types/application";
import type { SelectInputItem } from "@/types/elements";
import { getFileExtension } from "@/utils/documents";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/contexts/AuthContext";

import { Modal, Input, Button, SelectInput } from "@/components";
import { useDocumentStore } from "@/features/documents";
import styles from "./styles.module.scss";

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
  const formMethods = useForm<AddDocumentForm>();
  const user = useUser();
  const { documentModalOpened, closeDocumentModal } = useDocumentStore();
  const queryClient = useQueryClient();
  const { handleSubmit, reset, register } = formMethods;

  const applicationSelect: SelectInputItem = {
    name: "selectedApplication",
    label: "Select an application (optional)",
    options: [
      { label: "", value: undefined },
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
    const uniqueId = uuidv4();
    const fileType = getFileExtension(file.type);

    try {
      // Upload file
      const { data: fileData, error: fileError } = await supabase.storage
        .from("documents")
        .upload(`file-${documentName}-${uniqueId}`, file);

      if (fileError) {
        setSubmitLoading(false);
        throw toast.error("An error occurred while uploading the file");
      }

      // Create record with path to file
      const { error } = await supabase.from("documents").insert({
        user_id: user?.id,
        title: documentName,
        description: documentDescription,
        file_path: fileData?.path,
        file_type: file.type,
        ...(selectedApplication && { application_id: selectedApplication }),
      });

      if (error) {
        setSubmitLoading(false);
        throw toast.error("An error occurred while uploading the file");
      }

      toast.success("Document uploaded!");
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
      modalTitle='Upload a new document'
    >
      <FormProvider {...formMethods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input label='Document name *' {...register("documentName", { required: true })} />
          <Input
            label='Document description'
            {...register("documentDescription", { required: false })}
          />
          <Input
            label='Select a file *'
            type='file'
            accept='application/msword, application/docx, application/pdf'
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

import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useUser } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";

import { useApplicationStore } from "@/features/applications";
import { formItems, statusInput, workModelInput, employmentTypeInput } from "./formItems";
import { Input, SelectInput, Button } from "@/components";
import styles from "./styles.module.scss";

type ApplicationFormInput = Application;

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
      isEditing: state.applicationModalOpened === "edit",
    }))
  );

  // If editing, set activeApplication as defaultValues
  const formMethods = useForm<ApplicationFormInput>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: isEditing
      ? {
          ...applicationData,
          applied_at: format(new Date(applicationData?.applied_at as string), "yyyy-MM-dd"),
        }
      : {},
  });

  const { handleSubmit, reset } = formMethods;

  function handleFormReset() {
    reset();
    setSubmitLoading(false);
    handleCloseForm(false);
    queryClient.invalidateQueries({ queryKey: ["get-applications"] });
  }

  function handleError(error: unknown) {
    console.error("Error submitting form:", error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred.");
    }
  }

  // Form submission
  const onSubmit: SubmitHandler<ApplicationFormInput> = async (applicationData) => {
    setSubmitLoading(true);

    if (!user) {
      throw new Error("No valid user found.");
    }

    try {
      if (isEditing) {
        await updateApplication(applicationData);
      } else {
        await addNewApplication(applicationData);
      }
    } catch (error) {
      handleError(error);
    } finally {
      handleFormReset();
    }
  };

  async function updateApplication(applicationData: ApplicationFormInput) {
    const { error } = await supabase
      .from("applications")
      .update(applicationData)
      .eq("id", applicationData.id);

    if (error) {
      throw toast.error("An error occurred when updating the application.");
    }

    toast.success("Application updated");
  }

  async function addNewApplication(applicationData: ApplicationFormInput) {
    const { error } = await supabase
      .from("applications")
      .insert({ ...applicationData, user_id: user?.id as string });

    if (error) {
      throw toast.error("An error occurred when adding the application.");
    }

    toast.success("Application added");
  }

  async function deleteApplication(applicationData: Application) {
    // Prevent deleting demo data
    if (
      applicationData.id === "0cfad3f0-0375-426c-b635-86e134993ade" ||
      applicationData.id === "07c14adf-33bb-4ecb-9aff-39a5dbe1751c"
    ) {
      return toast.error("Guest demo data cannot be deleted.");
    }

    const close = confirm(
      "Are you sure you want to delete this application? This action cannot be undone."
    );

    if (!close) {
      return;
    }

    try {
      const { error } = await supabase.from("applications").delete().eq("id", applicationData?.id);

      if (error) {
        throw toast.error("An error occured when deleting the application.");
      }

      toast.success("Application deleted");
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
          {formItems.map(({ label, name, type, required }) => (
            <div className={styles.inputContainer} key={name}>
              <Input
                label={label}
                name={name}
                type={type}
                placeholder={label}
                required={required}
              />
            </div>
          ))}
          <SelectInput item={statusInput} />
          <SelectInput item={workModelInput} />
          <SelectInput item={employmentTypeInput} />
        </div>
        <div className={styles.buttons}>
          <Button disabled={submitLoading} type='submit'>
            {isEditing ? "Edit application" : "Add application"}
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

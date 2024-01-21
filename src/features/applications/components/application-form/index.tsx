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
    defaultValues: isEditing
      ? {
          ...applicationData,
          applied_at: format(new Date(applicationData?.applied_at as string), "yyyy-MM-dd"),
        }
      : {},
  });

  const { handleSubmit, reset } = formMethods;

  // Form submission
  const onSubmit: SubmitHandler<ApplicationFormInput> = async (formData) => {
    setSubmitLoading(true);

    try {
      // Update application
      if (isEditing) {
        const { error } = await supabase
          .from("applications ")
          .update(formData)
          .eq("id", formData.id);

        if (error) {
          setSubmitLoading(false);
          const errMessage = "An error occured when updating the application.";
          toast.error(errMessage);
          throw errMessage;
        }
        // Add new application
      } else {
        const { error } = await supabase.from("applications").insert({
          ...formData,
          user_id: user?.id,
        });

        if (error) {
          setSubmitLoading(false);
          const errMessage = "An error occured when adding the application.";
          toast.error(errMessage);
          throw errMessage;
        }
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      // Reset form
    } finally {
      reset();
      setSubmitLoading(false);
      handleCloseForm(false);
      queryClient.invalidateQueries({ queryKey: ["get-applications"] });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItems}>
          {formItems.map(({ label, name, type, required }) => (
            <Input
              key={name}
              label={label}
              name={name}
              type={type}
              placeholder={label}
              required={required}
            />
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
        </div>
      </form>
    </FormProvider>
  );
}

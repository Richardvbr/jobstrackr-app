import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "@/contexts/AuthContext";
import supabase from "@/lib/supabase";
import { Application } from "@/types/application";
import { useApplicationStore } from "@/features/applications";
import {
  formItems,
  statusInput,
  workModelInput,
  employmentTypeInput,
} from "./formItems";
import { Input, SelectInput, Button } from "@/components";
import styles from "./styles.module.scss";

type ApplicationFormInput = Application;

type ApplicationForm = {
  handleCloseForm: (askConfirm?: boolean) => void;
};

export const ApplicationForm = ({ handleCloseForm }: ApplicationForm) => {
  const { applicationData, isEditing } = useApplicationStore(
    useShallow((state) => ({
      applicationData: state.activeApplication,
      isEditing: state.applicationModalOpened === "edit",
    }))
  );

  const user = useUser();

  const queryClient = useQueryClient();

  // If editing, set activeApplication as defaultValues
  const formMethods = useForm<ApplicationFormInput>({
    // @ts-ignore
    defaultValues: isEditing && {
      ...applicationData,
      applied_at: format(
        new Date(applicationData?.applied_at as string),
        "yyyy-MM-dd"
      ),
    },
  });

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { handleSubmit, reset } = formMethods;

  // Form submission
  const onSubmit: SubmitHandler<ApplicationFormInput> = async (formData) => {
    setSubmitLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("applications")
          .update(formData)
          .eq("id", formData.id);

        if (error) {
          setSubmitLoading(false);
          return console.log(error);
        }
      } else {
        const { error } = await supabase.from("applications").insert({
          ...formData,
          user_id: user?.id,
        });

        if (error) {
          setSubmitLoading(false);
          return console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      reset();
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
};

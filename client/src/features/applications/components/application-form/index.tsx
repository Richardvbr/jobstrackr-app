"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

import useUser from "@/hooks/useUser";
import supabaseBrowserClient from "@/lib/supabase/client";
import {
  formItems,
  statusInput,
  workModelInput,
  employmentTypeInput,
} from "./formItems";
import { Input, SelectInput, Button } from "@/components";
import { useApplicationStore } from "@/features/applications";
import { Application } from "@/types/application";
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

  const { handleSubmit, reset, getValues } = formMethods;
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  // const { id: userId } = useUser();

  // Form submission
  // const onSubmit: SubmitHandler<ApplicationFormInput> = async (formData) => {
  //   setSubmitLoading(true);

  //   try {
  //     const { error } = await supabase
  //       .from("applications")
  //       .upsert(formData)
  //       .eq("id", applicationData.id);

  //     toast.success(`Your application was changed`);

  //     if (error) {
  //       setSubmitLoading(false);
  //       return console.log(error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitLoading(false);
  //     reset();
  //     handleCloseForm(false);
  //     router.refresh();
  //   }
  // };

  return (
    <FormProvider {...formMethods}>
      <form className={styles.form}>
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

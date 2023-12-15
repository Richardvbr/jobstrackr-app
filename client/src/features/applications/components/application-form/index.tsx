import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

import useUser from "@/hooks/useUser";
import supabaseBrowserClient from "@/lib/supabase";
import {
  formItems,
  statusInput,
  workModelInput,
  employmentTypeInput,
} from "./formItems";
import Input from "@/components/form-fields/input";
import SelectInput from "@/components/form-fields/select";
import Button from "@/components/button";
import styles from "./styles.module.scss";
import { useApplicationStore } from "../..";

type ApplicationFormInput = {
  company: string;
  position: string;
  applied_at: string;
};

type ApplicationForm = {
  handleCloseForm: (askConfirm?: boolean) => void;
};

export const ApplicationForm = ({ handleCloseForm }: ApplicationForm) => {
  const applicationData = useApplicationStore(
    (state) => state.activeApplication
  );

  const formMethods = useForm<ApplicationFormInput>({
    defaultValues: {
      company: "hello",
    },
  });

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { handleSubmit, reset } = formMethods;
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        company: "bill",
      });
    }, 2000);
  }, [reset]);

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
            Edit application
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

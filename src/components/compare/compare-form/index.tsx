import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Icons, Input } from '@/components/shared';
import type { Application } from '@/types/application';
import styles from './styles.module.scss';

type CompareFormProps = {
  applications: Application[];
  setSelectedApplications: (selectedApplications: string[]) => void;
};

type CompareApplicationsForm = {
  application1: string;
  application2: string;
  application3: string;
};

export function CompareForm({ applications, setSelectedApplications }: CompareFormProps) {
  const formMethods = useForm<CompareApplicationsForm>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<CompareApplicationsForm> = async (formData) => {
    const applicationIds = Object.values(formData).filter(Boolean).slice(0, 3);

    try {
      setSelectedApplications(applicationIds);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className={styles.selectApplications} onSubmit={handleSubmit(onSubmit)}>
        <p>Select up to 3 applications to compare:</p>
        {applications?.map(({ id, company }, i) => (
          <div className={styles.checkboxWrapper} key={id}>
            <Input name={`application${i}`} label={company as string} value={id} type='checkbox' />
          </div>
        ))}
        <Button type='submit'>
          <Icons.Compare />
          Compare
        </Button>
      </form>
    </FormProvider>
  );
}

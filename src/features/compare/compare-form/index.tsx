import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Icons, SelectInput } from '@/components';
import { Application } from '@/types/application';
import type { SelectInputItem } from '@/types/elements';
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

  function createApplicationSelect(name: string, label: string): SelectInputItem {
    return {
      name,
      label,
      options: [
        { label: 'Select an option', value: '' },
        ...(applications
          ? applications.map(({ id, company, position }) => ({
              value: id,
              label: `${company} - ${position}`,
            }))
          : []),
      ],
    };
  }

  const onSubmit: SubmitHandler<CompareApplicationsForm> = async (formData) => {
    const applicationIds = Object.values(formData).filter(Boolean);

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
        <SelectInput item={createApplicationSelect('application-1', 'Application 1')} />
        <SelectInput item={createApplicationSelect('application-2', 'Application 2')} />
        <SelectInput item={createApplicationSelect('application-3', 'Application 3')} />
        <Button type='submit'>
          <Icons.Compare />
          Compare
        </Button>
      </form>
    </FormProvider>
  );
}

import toast from 'react-hot-toast';
import { useToken } from '@/contexts/AuthContext';
import {
  useDeleteApplicationMutation,
  useNewApplicationMutation,
  useUpdateApplicationMutation,
} from '@/data/application';
import type { Application } from '@/types/application';

export function useApplicationActions() {
  const token = useToken();

  const { mutateAsync: newApplicationMutation } = useNewApplicationMutation(token);
  const { mutateAsync: updateApplicationMutation } = useUpdateApplicationMutation(token);
  const { mutateAsync: deleteApplicationMutation } = useDeleteApplicationMutation(token);

  const addNewApplication = (application: Application) => {
    newApplicationMutation(application, {
      onSuccess: () => toast.success('Application added'),
      onError: () => toast.error('An error occurred when adding the application.'),
    });
  };

  const updateApplication = (application: Application) => {
    updateApplicationMutation(application, {
      onSuccess: () => toast.success('Application updated'),
      onError: () => toast.error('An error occurred when updating the application.'),
    });
  };

  const deleteApplication = (application: Application, onDelete: () => void) => {
    const demoIds = [
      '0cfad3f0-0375-426c-b635-86e134993ade',
      '07c14adf-33bb-4ecb-9aff-39a5dbe1751c',
      '1675cad0-41d4-429a-97a9-c7964ea4692e',
    ];

    if (demoIds.includes(application.id)) {
      toast.error('Guest demo data cannot be deleted.');
      return;
    }

    const close = confirm(
      'Are you sure you want to delete this application? This action cannot be undone.'
    );

    if (!close) {
      return;
    }

    deleteApplicationMutation(application, {
      onSuccess: () => {
        toast.success('Application deleted');
      },
      onError: () => toast.error('An error occurred when deleting the application.'),
      onSettled: onDelete,
    });
  };

  return { addNewApplication, updateApplication, deleteApplication };
}

import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';

import { useApplicationStore } from '@/stores/applicationStore';
import { Modal } from '@/components/shared';
import { ApplicationForm } from '../application-form';

export function ApplicationModal() {
  const navigate = useNavigate();

  const { applicationModalOpened, closeModal, isEditing } = useApplicationStore(
    useShallow((state) => ({
      applicationModalOpened: state.applicationModalOpened,
      closeModal: state.closeApplicationModal,
      openModal: state.openNewApplicationModal,
      isEditing: state.applicationModalOpened === 'edit',
    }))
  );

  // Close form
  const handleCloseForm = (askConfirm = true) => {
    if (askConfirm) {
      const close = confirm(
        'Are you sure you want to close this window? Your changes will not be saved.'
      );

      if (!close) {
        return;
      }
    }

    navigate('/dashboard', { replace: true });
    closeModal();
  };

  return (
    <Modal
      opened={!!applicationModalOpened}
      handleClose={handleCloseForm}
      modalTitle={isEditing ? 'Edit application' : 'New application'}
    >
      <ApplicationForm handleCloseForm={handleCloseForm} />
    </Modal>
  );
}

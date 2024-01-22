import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "@tanstack/react-router";

import { ApplicationForm, useApplicationStore } from "@/features/applications";
import { dashboardRoute } from "@/routes";
import { Modal } from "@/components";

export function ApplicationModal() {
  const { applicationModalOpened, closeModal, isEditing } = useApplicationStore(
    useShallow((state) => ({
      applicationModalOpened: state.applicationModalOpened,
      closeModal: state.closeApplicationModal,
      openModal: state.openNewApplicationModal,
      isEditing: state.applicationModalOpened === "edit",
    }))
  );

  const navigate = useNavigate();

  // Close form
  const handleCloseForm = (askConfirm = true) => {
    if (askConfirm) {
      const close = confirm(
        "Are you sure you want to close this window? Your changes will not be saved."
      );

      if (!close) {
        return;
      }
    }

    closeModal();
    navigate({ to: dashboardRoute.fullPath });
  };

  return (
    <Modal
      opened={!!applicationModalOpened}
      handleClose={handleCloseForm}
      modalTitle={isEditing ? "Edit application" : "New application"}
    >
      <ApplicationForm handleCloseForm={handleCloseForm} />
    </Modal>
  );
}

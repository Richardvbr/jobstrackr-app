import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { ApplicationForm, useApplicationStore } from "@/features/applications";
import { Modal } from "@/components";

export const ApplicationModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // readonly

  const { applicationModalOpened, closeModal, openModal, isEditing } =
    useApplicationStore(
      useShallow((state) => ({
        applicationModalOpened: state.applicationModalOpened,
        closeModal: state.closeApplicationModal,
        openModal: state.openNewApplicationModal,
        isEditing: state.applicationModalOpened === "edit",
      }))
    );

  const action = searchParams.get("action");
  const newSearchParams = new URLSearchParams(searchParams.toString());

  // Open modal if query param matches
  useEffect(() => {
    if (action === "new-application") {
      openModal();
    }
  }, [searchParams]);

  // Close form
  const handleCloseForm = (askConfirm: boolean = true) => {
    if (askConfirm) {
      const close = confirm(
        "Are you sure you want to close this window? You will lose the new application data."
      );
      if (!close) {
        return;
      }
    }

    closeModal();
    newSearchParams.delete("action");
    router.replace(`${pathname}?${newSearchParams}`);
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
};

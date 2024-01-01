import { Application } from "@/types/application";
import { create } from "zustand";

type ApplicationStore = {
  applicationModalOpened: "new" | "edit" | false;
  openNewApplicationModal: () => void;
  openEditApplicationModal: () => void;
  closeApplicationModal: any;
  activeApplication: Application | null;
  setActiveApplication: (application: Application) => void;
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applicationModalOpened: false,
  openNewApplicationModal: () => set({ applicationModalOpened: "new" }),
  openEditApplicationModal: () => set({ applicationModalOpened: "edit" }),
  closeApplicationModal: () => set({ applicationModalOpened: false }),
  activeApplication: null,
  setActiveApplication: (application) =>
    set({ activeApplication: application }),
}));

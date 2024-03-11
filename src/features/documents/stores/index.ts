import { create } from "zustand";

type State = {
  documentModalOpened: boolean;
};

type Action = {
  openDocumentModal: () => void;
  closeDocumentModal: () => void;
};

export const useDocumentStore = create<State & Action>((set) => ({
  documentModalOpened: false,
  openDocumentModal: () => set({ documentModalOpened: true }),
  closeDocumentModal: () => set({ documentModalOpened: false }),
}));

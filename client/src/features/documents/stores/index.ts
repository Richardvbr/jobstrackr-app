import { create } from "zustand";

type DocumentStore = {
  documentModalOpened: boolean;
  openDocumentModal: () => void;
  closeDocumentModal: () => void;
};

export const useDocumentStore = create<DocumentStore>((set) => ({
  documentModalOpened: false,
  openDocumentModal: () => set({ documentModalOpened: true }),
  closeDocumentModal: () => set({ documentModalOpened: false }),
}));

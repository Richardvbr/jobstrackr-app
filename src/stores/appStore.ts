import { create } from "zustand";

type AppStore = {
  sidePanelOpened: boolean;
  openSidePanel: () => void;
  closeSidePanel: () => void;
  toggleSidePanel: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  sidePanelOpened: false,
  openSidePanel: () => set({ sidePanelOpened: true }),
  closeSidePanel: () => set({ sidePanelOpened: false }),
  toggleSidePanel: () => set((state) => ({ sidePanelOpened: !state.sidePanelOpened })),
}));

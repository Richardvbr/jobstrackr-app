import { create } from 'zustand';
import type { Application } from '@/types/application';

type State = {
  applicationModalOpened: 'new' | 'edit' | false;
  activeApplication: Application | null;
};

type Action = {
  openNewApplicationModal: () => void;
  openEditApplicationModal: () => void;
  closeApplicationModal: () => void;
  setActiveApplication: (application: Application) => void;
};

export const useApplicationStore = create<State & Action>((set) => ({
  applicationModalOpened: false,
  openNewApplicationModal: () => set({ applicationModalOpened: 'new' }),
  openEditApplicationModal: () => set({ applicationModalOpened: 'edit' }),
  closeApplicationModal: () => set({ applicationModalOpened: false }),
  activeApplication: null,
  setActiveApplication: (application) => set({ activeApplication: application }),
}));

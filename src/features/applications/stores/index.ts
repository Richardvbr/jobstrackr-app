import type { Application } from '@/features/applications';
import { create } from 'zustand';

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

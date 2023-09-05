import { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IModalStore {
  isOpen: boolean;
  options: unknown;
  content: ReactNode | null;
  handleModal: (content: ReactNode) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create(
  immer<IModalStore>((set) => ({
    isOpen: false,
    options: {} as unknown,
    content: null,
    openModal: () => {
      set((state) => {
        state.isOpen = true;
      });
    },
    closeModal: () => {
      set((state) => {
        state.isOpen = false;
        state.content = null;
        state.options = {} as unknown;
      });
    },
    handleModal: (content) => {
      set((state) => {
        state.content = content;
        state.isOpen = true;
      });
    },
  })),
);

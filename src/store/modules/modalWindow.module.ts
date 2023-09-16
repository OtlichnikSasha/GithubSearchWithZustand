import { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IModalActions {
  handleModal: (content: ReactNode, options?: IOptions) => void;
  openModal: () => void;
  closeModal: () => void;
}

interface IModalState {
  isOpen: boolean;
  options: IOptions;
  content: ReactNode | null;
}

type IModalStore = IModalActions & IModalState;

interface IOptions {
  title?: string;
  overlayClassName?: string;
  bodyClassName?: string;
  containerClassName?: string;
  withCloseButton?: boolean;
}

export const useModalStore = create(
  immer<IModalStore>((set) => ({
    isOpen: false,
    options: {} as IOptions,
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
        state.options = {} as IOptions;
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

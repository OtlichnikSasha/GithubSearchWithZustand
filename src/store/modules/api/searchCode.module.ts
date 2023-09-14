import { githubUsersService } from '@/services/githubUsersService';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ICodeStore {
  files: { id: string }[];
  total_count: number;
  isLoading: boolean;
  fetchFiles: (params: SearchUsersParams) => void;
}

export const useSearchCodeStore = create(
  immer<ICodeStore>((set) => ({
    files: [],
    total_count: 0,
    isLoading: false,
    fetchFiles: async (params) => {
      set((state) => {
        state.isLoading = true;
      });
      try {
        const { data } = await githubUsersService.getFiles(params);
        set((state) => {
          state.total_count = data.total_count;
        });
        set((state) => {
          state.files = data.items;
        });
      } catch (_) {
        return;
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
  })),
);

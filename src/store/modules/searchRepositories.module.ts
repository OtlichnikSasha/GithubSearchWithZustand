import { githubUsersService } from '@/services/githubUsersService';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IUsersStore {
  users: UserModel[];
  total_count: number;
  isLoading: boolean;
  fetchRepos: (params: SearchUsersParams) => void;
}

export const useSearchRepositoriesStore = create(
  immer<IUsersStore>((set) => ({
    users: [],
    total_count: 0,
    isLoading: false,
    fetchRepos: async (params) => {
      set((state) => {
        state.isLoading = true;
      });
      const { data } = await githubUsersService.getRepositories(params);
      set((state) => {
        state.total_count = data.total_count;
      });
      set((state) => {
        state.users = data.items;
      });
      set((state) => {
        state.isLoading = false;
      });
    },
  })),
);

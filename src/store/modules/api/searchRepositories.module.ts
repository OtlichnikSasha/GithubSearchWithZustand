import { githubUsersService } from '@/services/githubUsersService';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IReposStore {
  repos: RepositoryModel[];
  total_count: number;
  isLoading: boolean;
  fetchRepos: (params: SearchUsersParams) => void;
}

export const useSearchRepositoriesStore = create(
  immer<IReposStore>((set) => ({
    repos: [],
    total_count: 0,
    isLoading: false,
    fetchRepos: async (params) => {
      set((state) => {
        state.isLoading = true;
      });
      try {
        const { data } = await githubUsersService.getRepositories(params);
        set((state) => {
          state.total_count = data.total_count;
        });
        set((state) => {
          state.repos = data.items;
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

import { githubUsersService } from '@/services/githubUsersService';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ITopicsStore {
  topics: TopicModel[];
  total_count: number;
  isLoading: boolean;
  fetchTopics: (params: SearchUsersParams) => void;
}

export const useSearchTopicsStore = create(
  immer<ITopicsStore>((set) => ({
    topics: [],
    total_count: 0,
    isLoading: false,
    fetchTopics: async (params) => {
      set((state) => {
        state.isLoading = true;
      });
      const { data } = await githubUsersService.getTopics(params);
      set((state) => {
        state.total_count = data.total_count;
      });
      set((state) => {
        state.topics = data.items;
      });
      set((state) => {
        state.isLoading = false;
      });
    },
  })),
);

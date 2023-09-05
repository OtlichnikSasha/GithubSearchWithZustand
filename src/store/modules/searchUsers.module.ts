import { githubUsersService } from '@/services/githubUsersService';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IWeatherStore {
  users: UserModel[];
  total_count: number;
  isLoading: boolean;
  fetchUsers: (params: SearchUsersParams) => void;
}

export const useSearchUsersStore = create(
  immer<IWeatherStore>((set) => ({
    users: [],
    total_count: 0,
    isLoading: false,
    fetchUsers: async (params) => {
      set((state) => {
        state.isLoading = true;
      });
      const { data } = await githubUsersService.getUsers(params);
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

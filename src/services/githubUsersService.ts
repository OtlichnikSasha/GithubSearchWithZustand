import { api } from '@/config/api';

export const githubUsersService = {
  async getUsers(params: SearchUsersParams) {
    return await api.get<SearchUsersResponse>('/users', { params });
  },
};

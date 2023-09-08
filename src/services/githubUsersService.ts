import { api } from '@/config/api';

export const githubUsersService = {
  async getUsers(params: SearchUsersParams) {
    return await api.get<SearchUsersResponse>('/users', { params });
  },

  async getRepositories(params: unknown) {
    return await api.get('/repositories', { params });
  },

  async getFiles(params: unknown) {
    return await api.get('/code', { params });
  },

  async getTopics(params: unknown) {
    return await api.get('/topics', { params });
  },
};

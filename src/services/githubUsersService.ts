import { api } from '@/config/api';

export const githubUsersService = {
  async getUsers(params: SearchUsersParams) {
    return await api.get<SearchResponse<UserModel>>('/users', { params });
  },

  async getRepositories(params: unknown) {
    return await api.get<SearchResponse<RepositoryModel>>('/repositories', { params });
  },

  async getFiles(params: unknown) {
    return await api.get('/code', { params });
  },

  async getTopics(params: unknown) {
    return await api.get<SearchResponse<TopicModel>>('/topics', { params });
  },
};

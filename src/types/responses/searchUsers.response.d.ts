declare interface SearchUsersResponse {
  incomplete_results: boolean;
  items: UserModel[];
  total_count: number;
}

declare interface SearchUsersParams {
  q: string;
  sort?: 'followers' | 'repositories' | 'joined';
  order?: 'desc' | 'asc'; // default desc
  per_page?: number; // default 30
  page?: number;
}

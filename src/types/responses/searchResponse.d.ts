declare interface SearchResponse<T> {
  incomplete_results: boolean;
  items: T[];
  total_count: number;
}

import { useSearchRepositoriesStore } from '@/store/modules/api/searchRepositories.module';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import styles from './RepositoriesList.module.scss';
import { RepositoryItem } from './RepositoryItem/RepositoryItem';
import { SearchNotFound } from '../SearchNotFound/SearchNotFound';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const RepositoriesList = () => {
  const [searchParams] = useSearchParams();
  const { fetchRepos, isLoading, total_count, repos } = useSearchRepositoriesStore(
    (state) => state,
  );

  useEffect(() => {
    const searchParamsQuery = searchParams.get('q');
    if (searchParamsQuery)
      fetchRepos({
        q: searchParamsQuery,
        per_page,
      });
  }, [searchParams.get('q')]);

  if (!repos.length && !isLoading) {
    return (
      <>
        {formatNumberHelper(total_count)}
        <SearchNotFound
          title='По вашему запросу не найдено ни одного репозитория .'
          description='Вы можете попробовать другой запрос.'
        />
      </>
    );
  }

  return (
    <div className={styles.repositoriesList}>
      {isLoading ? (
        <>
          {loadingItems.map((_, index) => (
            <Skeleton className={styles.skeletonItem} key={index} />
          ))}
        </>
      ) : (
        <>
          {formatNumberHelper(total_count)}
          {repos?.map((repo) => (
            <RepositoryItem key={repo.id} repository={repo} />
          ))}
        </>
      )}
    </div>
  );
};

import { useSearchRepositoriesStore } from '@/store/modules/api/searchRepositories.module';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import styles from './RepositoriesList.module.scss';
import { RepositoryItem } from './RepositoryItem/RepositoryItem';
import { SearchNotFound } from '../SearchNotFound/SearchNotFound';
import { Pagination } from '../UI/Pagination/Pagination';
import { determinateWordHelper } from '@/helpers/determinateWord.helper';
import { ListWrapper } from '../ListWrapper/ListWrapper';

const loadingItems = new Array(8).fill('');
const per_page = 25;

const repositoriesWordsVariants = ['репозиторий', 'репозиторий', 'репозиториев'];

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

  const handlePageChange = useCallback(({ selected }: { selected: number }): void => {
    console.log(selected);
  }, []);

  if (!repos.length && !isLoading) {
    return (
      <>
        {formatNumberHelper(total_count)}{' '}
        {determinateWordHelper(total_count, repositoriesWordsVariants)}
        <SearchNotFound
          title='По вашему запросу не найдено ни одного репозитория .'
          description='Вы можете попробовать другой запрос.'
        />
      </>
    );
  }

  return (
    <ListWrapper>
      {isLoading ? (
        <>
          {loadingItems.map((_, index) => (
            <Skeleton className={styles.skeletonItem} key={index} />
          ))}
        </>
      ) : (
        <>
          {formatNumberHelper(total_count)}{' '}
          {determinateWordHelper(total_count / 1000, repositoriesWordsVariants)}
          {repos?.map((repo) => (
            <RepositoryItem key={repo.id} repository={repo} />
          ))}
          <Pagination
            pageCount={Number(repos?.length) / per_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </ListWrapper>
  );
};

import { useSearchRepositoriesStore } from '@/store/modules/searchRepositories.module';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';

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

  return (
    <>
      {isLoading ? (
        <>
          {loadingItems.map((_, index) => (
            <Skeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {!repos.length ? (
            <p>Ничего не найдено</p>
          ) : (
            <>
              {formatNumberHelper(total_count)}
              {repos?.map((repo) => (
                <div key={repo.id}>{repo.id}</div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

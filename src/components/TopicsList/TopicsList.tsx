import { useSearchTopicsStore } from '@/store/modules/api/searchTopics.module';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import styles from './TopicsList.module.scss';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const TopicsList = () => {
  const [searchParams] = useSearchParams();
  const { fetchTopics, isLoading, total_count, topics } = useSearchTopicsStore((state) => state);

  useEffect(() => {
    const searchParamsQuery = searchParams.get('q');
    if (searchParamsQuery)
      fetchTopics({
        q: searchParamsQuery,
        per_page,
      });
  }, [searchParams.get('q')]);
  return (
    <>
      {!topics.length && !isLoading ? (
        <p>Ничего не найдено</p>
      ) : (
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
              {topics?.map((topic) => (
                <div key={`${topic.name}-${topic.created_at}`}>{topic.name}</div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

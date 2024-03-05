import { useSearchTopicsStore } from '@/store/modules/api/searchTopics.module';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import styles from './TopicsList.module.scss';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import { TopicItem } from './TopicItem/TopicItem';
import { SearchNotFound } from '../SearchNotFound/SearchNotFound';
import { ListWrapper } from '../ListWrapper/ListWrapper';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const TopicsList = () => {
  const [searchParams] = useSearchParams();
  const { fetchTopics, isLoading, total_count, topics } = useSearchTopicsStore();

  useEffect(() => {
    const searchParamsQuery = searchParams.get('q');
    if (searchParamsQuery)
      fetchTopics({
        q: searchParamsQuery,
        per_page,
      });
  }, [searchParams.get('q')]);

  if (!topics.length && !isLoading) {
    return (
      <>
        {formatNumberHelper(total_count)}
        <SearchNotFound
          title='По вашему запросу не найдено ни одной метки .'
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
          {formatNumberHelper(total_count)}
          {topics?.map((topic) => (
            <TopicItem key={`${topic.name}-${topic.created_at}`} topic={topic} />
          ))}
        </>
      )}
    </ListWrapper>
  );
};

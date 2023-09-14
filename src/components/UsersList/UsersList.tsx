import { useElementOnScreen } from '@/hooks/useElementOnScreen';
import { RefObject, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '../UI/Skeleton/Skeleton';
import { useSearchUsersStore } from '@/store/modules/api/searchUsers.module';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import { UserItem } from './UserItem/UserItem';
import styles from './UsersList.module.scss';
import { SearchNotFound } from '../SearchNotFound/SearchNotFound';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const UsersList = () => {
  const [searchParams] = useSearchParams();
  const { fetchUsers, isLoading, users, total_count } = useSearchUsersStore((state) => state);
  const pageRef = useRef<number>(1);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    // const typeQuery = searchParams.get('type');
    if (searchQuery) {
      fetchUsers({ q: searchQuery, per_page, page: pageRef.current });
    }
  }, [searchParams.get('q')]);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 1.0,
    rootMargin: '40px',
  });

  useEffect(() => {
    console.log(isVisible, isLoading, users.length);

    if (isVisible && !isLoading && users.length < total_count) {
      pageRef.current += 1;
      //   fetchUsers({ q: searchValue, per_page, page: pageRef.current });
    }
  }, [isVisible]);

  if (!users.length && !isLoading) {
    return (
      <>
        {formatNumberHelper(total_count)}
        <SearchNotFound
          title='По вашему запросу не найдено ни одного пользователя.'
          description='Вы можете попробовать другой запрос.'
        />
      </>
    );
  }

  return (
    <section className={styles.usersList}>
      {isLoading ? (
        <div>
          {loadingItems.map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {formatNumberHelper(total_count)} results
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
          <div ref={containerRef as RefObject<HTMLDivElement>} />
        </>
      )}
    </section>
  );
};

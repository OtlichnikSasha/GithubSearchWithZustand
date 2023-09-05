import { Skeleton } from '@/components/UI/Skeleton/Skeleton';
import { UserItem } from '@/components/UserItem/UserItem';
import { useElementOnScreen } from '@/hooks/useElementOnScreen';
import { useSearchUsersStore } from '@/store/modules/searchUsers.module';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Main.module.scss';
import { Input } from '@/components/UI/Input/Input';
import { Sidebar } from '@/components/Layout/Sidebar/Sidebar';
import { SearchWithoutQuery } from '@/pages/Main/SearchWithoutQuery/SearchWithoutQuery';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const Main = () => {
  const [searchParams] = useSearchParams();
  const { fetchUsers, isLoading, users, total_count } = useSearchUsersStore((state) => state);
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('q') || '');
  const pageRef = useRef<number>(1);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    // const typeQuery = searchParams.get('type');
    if (searchQuery) {
      fetchUsers({ q: searchValue, per_page, page: pageRef.current });
    }
  }, [searchParams.get('q')]);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 1.0,
    rootMargin: '40px',
  });

  const handleSubmit = (): void => {
    if (searchValue.length) fetchUsers({ q: searchValue, per_page, page: pageRef.current });
  };

  useEffect(() => {
    console.log(isVisible, isLoading, users.length);

    if (isVisible && !isLoading && users.length < total_count) {
      pageRef.current += 1;
      //   fetchUsers({ q: searchValue, per_page, page: pageRef.current });
    }
  }, [isVisible]);

  if (!searchValue) return <SearchWithoutQuery />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Поиск'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>

      <main className={styles.main}>
        <Sidebar />

        {isLoading ? (
          <div>
            {loadingItems.map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <section className={styles.content}>
            {!users.length ? (
              <p>Ничего не найдено</p>
            ) : (
              <section className={styles.usersList}>
                {formatNumberHelper(total_count)} results
                {users.map((user) => (
                  <UserItem key={user.id} user={user} />
                ))}
                <div ref={containerRef as RefObject<HTMLDivElement>} />
              </section>
            )}
          </section>
        )}
      </main>
    </>
  );
};

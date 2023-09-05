import { Container } from '@/components/Container/Container';
import { Skeleton } from '@/components/UI/Skeleton/Skeleton';
import { UserItem } from '@/components/UserItem/UserItem';
import { useElementOnScreen } from '@/hooks/useElementOnScreen';
import { useSearchUsersStore } from '@/store/modules/searchUsers.module';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Main.module.scss';
import { Input } from '@/components/UI/Input/Input';

const loadingItems = new Array(8).fill('');
const per_page = 25;

export const Main = () => {
  const [searchParams] = useSearchParams();
  const { fetchUsers, isLoading, users, total_count } = useSearchUsersStore((state) => state);
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('q') || 's');
  const pageRef = useRef<number>(1);

  useEffect(() => {
    fetchUsers({ q: searchValue, per_page, page: pageRef.current });
  }, []);

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

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Поиск'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>

      {isLoading ? (
        <div>
          {loadingItems.map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div>
          {!users.length ? (
            <p>Ничего не найдено</p>
          ) : (
            <section className={styles.usersList}>
              {users.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
              <div ref={containerRef as RefObject<HTMLDivElement>} />
            </section>
          )}
        </div>
      )}
    </Container>
  );
};

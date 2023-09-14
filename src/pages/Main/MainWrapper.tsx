import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './MainWrapper.module.scss';
import { Input } from '@/components/UI/Input/Input';
import { Sidebar } from '@/components/Layout/Sidebar/Sidebar';
import { SearchWithoutQuery } from '@/pages/Main/SearchWithoutQuery/SearchWithoutQuery';
import { UsersList } from '@/components/UsersList/UsersList';
import { LinksEnum } from '@/types/enums/LinksEnum';
import { RepositoriesList } from '@/components/RepositoriesList/RepositoriesList';
import { TopicsList } from '@/components/TopicsList/TopicsList';
import { ReactComponent as IconGithub } from '@/assets/images/icons/icon-github.svg';

const typesVariants = Object.values(LinksEnum);

const searchLists = {
  [LinksEnum.CODE]: <></>,
  [LinksEnum.USERS]: <UsersList />,
  [LinksEnum.TOPICS]: <TopicsList />,
  [LinksEnum.REPOSITORIES]: <RepositoriesList />,
};

export const Main = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && searchInputRef.current?.value.length) {
      return navigate(`../q=${searchInputRef.current.value}&type=${searchParams.get('type')}`);
    }
  };

  useEffect(() => {
    if (searchParams.get('q') && searchInputRef.current) {
      searchInputRef.current.value = searchParams.get('q') || '';
    }
  }, [searchParams.get('q'), searchInputRef]);

  if (!searchParams.get('q')) return <SearchWithoutQuery />;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__logo}>
            <IconGithub />
          </div>
          <Input placeholder='Поиск' ref={searchInputRef} onKeyDown={handleKeyEvent} />
        </div>
      </header>

      <main className={styles.main}>
        <Sidebar />

        <section className={styles.content}>
          {searchParams.get('type') &&
          typesVariants.includes(searchParams.get('type') as LinksEnum) ? (
            <>{searchLists[searchParams.get('type') as LinksEnum]}</>
          ) : (
            <Navigate to={`.../?q=${searchParams.get('q')}&type=${LinksEnum.REPOSITORIES}`} />
          )}
        </section>
      </main>
    </>
  );
};

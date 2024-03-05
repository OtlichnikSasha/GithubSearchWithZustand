import { Navigate, useSearchParams } from 'react-router-dom';
import styles from './MainWrapper.module.scss';
import { Sidebar } from '@/components/Layout/Sidebar/Sidebar';
import { SearchWithoutQuery } from '@/pages/Main/SearchWithoutQuery/SearchWithoutQuery';
import { UsersList } from '@/components/UsersList/UsersList';
import { LinksEnum } from '@/types/enums/LinksEnum';
import { RepositoriesList } from '@/components/RepositoriesList/RepositoriesList';
import { TopicsList } from '@/components/TopicsList/TopicsList';
import { Header } from '@/components/Layout/Header/Header';

const typesVariants = Object.values(LinksEnum);

const searchLists = {
  [LinksEnum.CODE]: <></>,
  [LinksEnum.USERS]: <UsersList />,
  [LinksEnum.TOPICS]: <TopicsList />,
  [LinksEnum.REPOSITORIES]: <RepositoriesList />,
};

export const Main = () => {
  const [searchParams] = useSearchParams();

  if (!searchParams.get('q')) return <SearchWithoutQuery />;

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Sidebar />

        <section className={styles.content}>
          {searchParams.get('type') &&
          typesVariants.includes(searchParams.get('type') as LinksEnum) ? (
            searchLists[searchParams.get('type') as LinksEnum]
          ) : (
            <Navigate to={`.../?q=${searchParams.get('q')}&type=${LinksEnum.REPOSITORIES}`} />
          )}
        </section>
      </main>
    </>
  );
};

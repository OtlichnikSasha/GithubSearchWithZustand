import { Link, useSearchParams } from 'react-router-dom';
import { sidebarLinks } from './Sidebar.constants';
import styles from './Sidebar.module.scss';
import { useEffect, useMemo } from 'react';
import { useSearchUsersStore } from '@/store/modules/searchUsers.module';
import { useSearchRepositoriesStore } from '@/store/modules/searchRepositories.module';
import cn from 'classnames';
import { LinksEnum } from '@/types/enums/LinksEnum';
import { Skeleton } from '@/components/UI/Skeleton/Skeleton';

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const usersStore = useSearchUsersStore((state) => state);
  const repositoriesStore = useSearchRepositoriesStore((state) => state);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      usersStore.fetchUsers({ q: searchQuery, per_page: 1 });
      repositoriesStore.fetchRepos({ q: searchQuery, per_page: 1 });
    }
  }, [searchParams.get('q')]);

  const withdrawalTotal = useMemo(() => {
    return {
      [LinksEnum.USERS]: {
        isLoading: usersStore.isLoading,
        totalCount: usersStore.total_count,
      },
      [LinksEnum.REPOSITORIES]: {
        isLoading: repositoriesStore.isLoading,
        totalCount: repositoriesStore.total_count,
      },
      [LinksEnum.CODE]: {
        isLoading: true,
        totalCount: 25,
      },
      [LinksEnum.TOPICS]: {
        isLoading: true,
        totalCount: 28,
      },
    };
  }, [
    usersStore.isLoading,
    usersStore.total_count,
    repositoriesStore.isLoading,
    repositoriesStore.total_count,
  ]);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Filter by</h2>
      <ul className={styles.sidebar__list}>
        {sidebarLinks.map((link) => (
          <li
            key={link.type}
            className={cn(styles.sidebar__list_item, {
              [styles.active]: link.type === searchParams.get('type'),
            })}
          >
            <Link to={`..?q=${searchParams.get('q')}&type=${link.type}`}>
              {link.icon}
              <p>{link.name}</p>
              <span>
                {withdrawalTotal[link.type].isLoading ? (
                  <Skeleton className={styles.skeleton} />
                ) : (
                  withdrawalTotal[link.type].totalCount
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

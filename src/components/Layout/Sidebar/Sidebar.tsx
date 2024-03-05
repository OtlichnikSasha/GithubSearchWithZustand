import { Link, useSearchParams } from 'react-router-dom';
import { sidebarLinks, programmingLanguages } from './Sidebar.constants';
import styles from './Sidebar.module.scss';
import { useEffect, useMemo } from 'react';
import { useSearchUsersStore } from '@/store/modules/api/searchUsers.module';
import { useSearchRepositoriesStore } from '@/store/modules/api/searchRepositories.module';
import cn from 'classnames';
import { LinksEnum } from '@/types/enums/LinksEnum';
import { Skeleton } from '@/components/UI/Skeleton/Skeleton';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import { useSearchCodeStore } from '@/store/modules/api/searchCode.module';
import { useSearchTopicsStore } from '@/store/modules/api/searchTopics.module';
import { getAllQueryParamsHelper } from '@/helpers/getAllQueryParams.helper';

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const usersStore = useSearchUsersStore((state) => state);
  const repositoriesStore = useSearchRepositoriesStore((state) => state);
  const filesStore = useSearchCodeStore((state) => state);
  const topicsStore = useSearchTopicsStore((state) => state);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      usersStore.fetchUsers({ q: searchQuery, per_page: 0 });
      repositoriesStore.fetchRepos({ q: searchQuery, per_page: 0 });
      filesStore.fetchFiles({ q: searchQuery, per_page: 0 });
      topicsStore.fetchTopics({ q: searchQuery, per_page: 0 });
    }
  }, [searchParams.get('q')]);

  const withdrawalTotal = useMemo((): Record<
    LinksEnum,
    { isLoading: boolean; totalCount: number }
  > => {
    return {
      [LinksEnum.USERS]: {
        isLoading: usersStore.isLoading && !usersStore.total_count,
        totalCount: usersStore.total_count,
      },
      [LinksEnum.REPOSITORIES]: {
        isLoading: repositoriesStore.isLoading && !repositoriesStore.total_count,
        totalCount: repositoriesStore.total_count,
      },
      [LinksEnum.CODE]: {
        isLoading: filesStore.isLoading && !filesStore.total_count,
        totalCount: filesStore.total_count,
      },
      [LinksEnum.TOPICS]: {
        isLoading: topicsStore.isLoading && !topicsStore.total_count,
        totalCount: topicsStore.total_count,
      },
    };
  }, [
    usersStore.isLoading,
    usersStore.total_count,
    repositoriesStore.isLoading,
    repositoriesStore.total_count,
    filesStore.isLoading,
    filesStore.total_count,
    topicsStore.isLoading,
    topicsStore.total_count,
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

              {withdrawalTotal[link.type].isLoading ? (
                <Skeleton className={styles.skeleton} />
              ) : (
                <span className={styles.totalCount}>
                  {formatNumberHelper(withdrawalTotal[link.type].totalCount)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <p>Languages</p>

      <ul>
        {programmingLanguages.map((language) => (
          <li key={language.name}>
            <Link
              to={`..?${{ ...getAllQueryParamsHelper(searchParams) }}&language:${language.name}`}
              title={language.name}
            >
              <span style={{ background: language.color }} />
              {language.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.resizeSliderWrapper}>
        <div className={styles.resizeSlider} />
      </div>
    </aside>
  );
};

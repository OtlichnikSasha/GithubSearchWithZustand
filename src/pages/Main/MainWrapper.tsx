import { KeyboardEventHandler, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import styles from './MainWrapper.module.scss';
import { Input } from '@/components/UI/Input/Input';
import { Sidebar } from '@/components/Layout/Sidebar/Sidebar';
import { SearchWithoutQuery } from '@/pages/Main/SearchWithoutQuery/SearchWithoutQuery';
import { UsersList } from '@/components/UsersList/UsersList';
import { LinksEnum } from '@/types/enums/LinksEnum';

const typesVariants = Object.values(LinksEnum);

export const Main = () => {
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && searchInputRef.current?.value.length) return;
  };

  if (!searchParams.get('q')) return <SearchWithoutQuery />;

  return (
    <>
      <Input placeholder='Поиск' ref={searchInputRef} onKeyDown={handleKeyEvent} />

      <main className={styles.main}>
        <Sidebar />

        {searchParams.get('type') &&
        typesVariants.includes(searchParams.get('type') as LinksEnum) ? (
          <UsersList /> // todo determinate pages
        ) : (
          <Navigate to={`../?q=${searchParams.get('q')}&type=${LinksEnum.REPOSITORIES}`} />
        )}
      </main>
    </>
  );
};

import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { ReactComponent as IconGithub } from '@/assets/images/icons/icon-github.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/UI/Input/Input';
import styles from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get('q') && searchInputRef.current) {
      searchInputRef.current.value = searchParams.get('q') || '';
    }
  }, [searchParams.get('q'), searchInputRef]);

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if (event.key === 'Enter' && searchInputRef.current?.value.length) {
      return navigate(`/?q=${searchInputRef.current.value}&type=${searchParams.get('type')}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <IconGithub />
        </div>
        <Input placeholder='Поиск' ref={searchInputRef} onKeyDown={handleKeyEvent} />
      </div>
    </header>
  );
};

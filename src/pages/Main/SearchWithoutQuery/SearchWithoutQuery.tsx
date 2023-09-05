import { Container } from '../../../components/Container/Container';
import { ReactComponent as IconLogo } from '@/assets/images/icons/icon-logo.svg';
import styles from './SearchWithQuery.module.scss';
import { Input } from '../../../components/UI/Input/Input';
import fullHomeBackground from '@/assets/images/full-github-background.png';
import mobileHomeBackground from '@/assets/images/home-mobile-dark.webp';
import { useMediaQuery } from 'react-responsive';
import { KeyboardEventHandler, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LinksEnum } from '@/types/enums/LinksEnum';

export const SearchWithoutQuery = () => {
  const [_, setSearchParams] = useSearchParams();
  const isTablet = useMediaQuery({
    maxWidth: '768px',
  });
  const searchInputref = useRef<HTMLInputElement>(null);

  const handleKey: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && searchInputref.current?.value?.length) {
      setSearchParams({
        q: searchInputref.current.value,
        type: LinksEnum.REPOSITORIES,
      });
    }
  };

  return (
    <Container as='main'>
      <section className={styles.wrapper}>
        <div className={styles.logo}>
          <IconLogo />
        </div>
        <div className={styles.input}>
          <Input placeholder='Search Github' autoFocus ref={searchInputref} onKeyDown={handleKey} />
        </div>
        <div className={styles.background_image}>
          <img src={isTablet ? mobileHomeBackground : fullHomeBackground} alt='Github' />
        </div>
      </section>
    </Container>
  );
};

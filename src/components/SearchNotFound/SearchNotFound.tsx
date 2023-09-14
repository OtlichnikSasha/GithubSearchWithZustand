import notFoundImage from '@/assets/images/not-found.png';
import { FC } from 'react';
import styles from './SearchNotFound.module.scss';
import { Typography } from '../UI/Typography/Typography';

interface ISearchNotFoundProps {
  title: string;
  description: string;
}

export const SearchNotFound: FC<ISearchNotFoundProps> = ({ description, title }) => {
  return (
    <section className={styles.notFound}>
      <div>
        <img src={notFoundImage} alt='Not found' />
      </div>

      <Typography variant='variant_20_24' color='ffffff'>
        {title}
      </Typography>

      <Typography variant='variant_14_16' color='ffffff'>
        {description}
      </Typography>
    </section>
  );
};

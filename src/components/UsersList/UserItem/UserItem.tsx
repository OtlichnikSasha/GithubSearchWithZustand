import { FC } from 'react';
import styles from './UserItem.module.scss';
import { CardItemWrapper } from '../../CardItemWrapper/CardItemWrapper';
import { Typography } from '@/components/UI/Typography/Typography';

interface UserItemProps {
  user: UserModel;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <CardItemWrapper>
      <div className={styles.userCard__container}>
        <div className={styles.userCard__avatar}>
          <img src={user.avatar_url} alt={user.login} />
        </div>
        <Typography
          variant='variant_16_20'
          fontWeight='500'
          color='2f81f7'
          as='a'
          rel='noopener noreferrer'
          target='_blank'
          href={user.html_url}
        >
          {user.login}
        </Typography>
      </div>
    </CardItemWrapper>
  );
};

import { FC } from 'react';
import styles from './UserItem.module.scss';
import { CardItemWrapper } from '../../CardItemWrapper/CardItemWrapper';

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
        <div>
          {user.login}
          {user.organizations_url}
        </div>
      </div>
    </CardItemWrapper>
  );
};

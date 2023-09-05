import { FC } from 'react';
import styles from './UserItem.module.scss';

interface UserItemProps {
  user: UserModel;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <article className={styles.userCard}>
      <div className={styles.userCard__avatar}>
        <img src={user.avatar_url} alt={user.login} />
      </div>
      <div>
        {user.login}
        {user.organizations_url}
      </div>
    </article>
  );
};

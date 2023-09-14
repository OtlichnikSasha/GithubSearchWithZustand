import { FC } from 'react';
import styles from './RepositoryItem.module.scss';
import { ReactComponent as IconLinkAway } from '@/assets/images/icons/icon-link-away.svg';
import { CardItemWrapper } from '../../CardItemWrapper/CardItemWrapper';

interface RepositoryItemProps {
  repository: RepositoryModel;
}

export const RepositoryItem: FC<RepositoryItemProps> = ({ repository }) => {
  return (
    <CardItemWrapper>
      <div className={styles.repoCard__container}>
        <div className={styles.repoCard__data}>
          <div className={styles.repoCard__ownerData}>
            <div className={styles.repoCard__ownerData_img}>
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            </div>
            <p>{repository.owner.login}</p>
          </div>
        </div>

        <a className={styles.repoCard__linkAwayButton} href={repository.url} target='_blank'>
          <IconLinkAway />
        </a>
      </div>
    </CardItemWrapper>
  );
};

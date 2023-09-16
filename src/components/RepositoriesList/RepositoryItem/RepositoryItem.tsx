import { FC } from 'react';
import styles from './RepositoryItem.module.scss';
import { ReactComponent as IconLinkAway } from '@/assets/images/icons/icon-link-away.svg';
import { ReactComponent as IconStar } from '@/assets/images/icons/icon-star.svg';
import { CardItemWrapper } from '../../CardItemWrapper/CardItemWrapper';
import { Typography } from '@/components/UI/Typography/Typography';
import cn from 'classnames';
import 'dayjs/locale/ru';
import { formatNumberHelper } from '@/helpers/formatNumber.helper';
import dayjs from 'dayjs';

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
            <Typography
              as='a'
              color='2f81f7'
              rel='noreferrer noopener'
              target='_blank'
              href={repository.html_url}
            >
              {repository.full_name}
            </Typography>
          </div>

          {repository?.description && (
            <Typography variant='variant_14_16' className={styles.description}>
              {repository.description}
            </Typography>
          )}

          {repository?.topics?.length > 0 && (
            <div className={styles.topics}>
              {repository.topics.slice(0, 5).map((topic) => (
                <a key={topic} href={`/topic/${topic}`} className={styles.topics__item}>
                  {topic}
                </a>
              ))}
            </div>
          )}

          <section className={styles.repoCard__footer}>
            {repository?.language && (
              <>
                <Typography
                  variant='variant_12_14'
                  color='7d8590'
                  className={cn(styles.language, styles[repository.language.toLowerCase()])}
                >
                  {repository.language}
                </Typography>
                <span className={styles.repoCard__footer_dot} />
              </>
            )}

            <Typography
              as='a'
              rel='noreferrer noopener'
              target='_blank'
              className={styles.watchers}
              href={`${repository.html_url}/stargazers`}
            >
              <IconStar />
              <Typography as='span' variant='variant_12_14' color='7d8590'>
                {formatNumberHelper(repository.watchers_count)}
              </Typography>
            </Typography>
            <span className={styles.repoCard__footer_dot} />
            <Typography variant='variant_12_14' color='7d8590'>
              Обновлено {dayjs(repository.pushed_at).locale('ru').format('D MMM YYYY г.')}
            </Typography>
          </section>
        </div>

        <a className={styles.repoCard__linkAwayButton} href={repository.url} target='_blank'>
          <IconLinkAway />
        </a>
      </div>
    </CardItemWrapper>
  );
};

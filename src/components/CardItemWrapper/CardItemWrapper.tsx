import { FC, PropsWithChildren } from 'react';
import styles from './CardItemWrapper.module.scss';

export const CardItemWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <article className={styles.card}>{children}</article>;
};

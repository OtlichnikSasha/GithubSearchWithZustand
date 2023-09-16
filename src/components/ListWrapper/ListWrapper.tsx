import { FC, PropsWithChildren } from 'react';
import styles from './ListWrapper.module.scss';

export const ListWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <section className={styles.list}>{children}</section>;
};

import { FC, ReactNode } from 'react';
import styles from './Container.module.scss';

interface IContainerProps {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
}

export const Container: FC<IContainerProps> = ({ children, as: Tag = 'div' }) => {
  return <Tag className={styles.container}>{children}</Tag>;
};

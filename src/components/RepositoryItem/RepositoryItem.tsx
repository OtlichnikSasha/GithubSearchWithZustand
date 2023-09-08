import { FC } from 'react';

interface RepositoryItemProps {
  repository: RepositoryModel;
}

export const RepositoryItem: FC<RepositoryItemProps> = ({ repository }) => {
  return (
    <div>
      <div>{repository.owner.login}</div>
      <div>{repository.score}</div>
    </div>
  );
};

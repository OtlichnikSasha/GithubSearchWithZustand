import { CardItemWrapper } from '@/components/CardItemWrapper/CardItemWrapper';
import { FC } from 'react';

interface ITopicItemProps {
  topic: TopicModel;
}

export const TopicItem: FC<ITopicItemProps> = ({ topic }) => {
  return <CardItemWrapper>{topic.name}</CardItemWrapper>;
};

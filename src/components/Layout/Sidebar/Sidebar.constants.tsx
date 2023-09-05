import { ReactComponent as IconCode } from '@/assets/images/icons/sidebar/icon-code.svg';
import { ReactComponent as IconRepositories } from '@/assets/images/icons/sidebar/icon-repositories.svg';
import { ReactComponent as IconTopics } from '@/assets/images/icons/sidebar/icon-topics.svg';
import { ReactComponent as IconUsers } from '@/assets/images/icons/sidebar/icon-users.svg';
import { LinksEnum } from '@/types/enums/LinksEnum';
import { ReactNode } from 'react';

interface ISidebarLink {
  name: string;
  icon: ReactNode;
  type: LinksEnum;
}

export const sidebarLinks: ISidebarLink[] = [
  {
    name: 'Code',
    icon: <IconCode />,
    type: LinksEnum.CODE,
  },
  {
    name: 'Repositories',
    icon: <IconRepositories />,
    type: LinksEnum.REPOSITORIES,
  },
  {
    name: 'Users',
    icon: <IconUsers />,
    type: LinksEnum.USERS,
  },
  {
    name: 'Topics',
    icon: <IconTopics />,
    type: LinksEnum.TOPICS,
  },
];

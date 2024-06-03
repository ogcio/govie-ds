import { MainMenuItem } from './main-menu';

export const mainMenuItems: Omit<MainMenuItem, 'isActive'>[] = [
  {
    id: 'get-started',
    name: 'Get started',
    href: '/get-started/',
  },
  {
    id: 'foundations',
    name: 'Foundations',
    href: '/foundations/',
  },
  {
    id: 'components',
    name: 'Components',
    href: '/components/',
  },
  {
    id: 'patterns',
    name: 'Patterns',
    href: '/patterns/',
  },
  {
    id: 'resources',
    name: 'Resources',
    href: '/resources/',
  },
];

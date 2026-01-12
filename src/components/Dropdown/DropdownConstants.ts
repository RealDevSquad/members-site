import { dropdownLinksType } from './types/dropdownLinks';
import { UserLogout } from './components/UserLogout';

export const DROPDOWN_LINKS: Array<dropdownLinksType> = [
  {
    id: 0,
    label: 'Home',
    link: 'https://www.realdevsquad.com',
  },
  {
    id: 1,
    label: 'Status',
    link: 'https://www.realdevsquad.com/status',
  },
  {
    id: 2,
    label: 'Profile',
    link: 'https://www.realdevsquad.com/profile',
  },
  {
    id: 3,
    label: 'Tasks',
    link: 'https://status.realdevsquad.com/tasks',
  },
  {
    id: 4,
    label: 'Identity',
    link: 'https://www.realdevsquad.com/identity',
  },
  {
    id: 5,
    label: UserLogout,
    link: 'https://api.realdevsquad.com/auth/signout',
  },
];

export const LOGOUT_API = 'https://api.realdevsquad.com/auth/signout';

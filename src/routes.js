import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import ContributionsList from './pages/Dashboard/ContributionsList.vue';
import NewContribution from './pages/Dashboard/NewContribution.vue';
import NewEvent from './pages/Dashboard/NewEvent.vue';
import NewSource from './pages/Dashboard/NewSource.vue';

const Empty = {
  render() {
    return '';
  },
};

export const routes = [
  {
    name: 'root',
    path: '/',
    redirect: { name: 'login' },
  },
  {
    name: 'login',
    path: '/prijava',
    component: LoginPage,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: DashboardPage,
    redirect: { name: 'contributions' },
    children: [
      {
        name: 'contributions',
        path: 'prispevki',
        component: ContributionsList,
      },
      {
        name: 'reports',
        path: 'porocila',
        component: Empty,
      },
      {
        name: 'about-reporting',
        path: 'o-porocanju',
        component: Empty,
      },
      {
        name: 'new-contribution',
        path: 'nov-prispevek',
        component: NewContribution,
      },
      {
        name: 'new-event',
        path: 'nov-dogodek',
        component: NewEvent,
      },
      {
        name: 'new-source',
        path: 'nov-vir',
        component: NewSource,
      },
    ],
  },
];

import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import NewContribution from './components/NewContribution.vue';
import NewEvent from './components/NewEvent.vue';
import NewSource from './components/NewSource.vue';

export const routes = [
  {
    name: 'root',
    path: '/',
    redirect: { name: 'login' },
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: DashboardPage,
    children: [
      {
        name: 'new-contribution',
        path: 'new-contribution',
        component: NewContribution,
      },
      {
        name: 'new-event',
        path: 'new-event',
        component: NewEvent,
      },
      {
        name: 'new-source',
        path: 'new-source',
        component: NewSource,
      },
    ],
  },
];

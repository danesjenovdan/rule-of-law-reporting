import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import ContributionsList from './pages/Dashboard/ContributionsList.vue';
import ReportsList from './pages/Dashboard/ReportsList.vue';
import AboutReporting from './pages/Dashboard/AboutReporting.vue';
import NewContribution from './pages/Dashboard/NewContribution.vue';
import NewEvent from './pages/Dashboard/NewEvent.vue';
import NewSource from './pages/Dashboard/NewSource.vue';

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
        component: ReportsList,
      },
      {
        name: 'about-reporting',
        path: 'o-porocanju',
        component: AboutReporting,
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

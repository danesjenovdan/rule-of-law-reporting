import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import ContributionsList from './pages/Dashboard/ContributionsList.vue';
import ContributionView from './pages/Dashboard/ContributionView.vue';
import ReportsList from './pages/Dashboard/ReportsList.vue';
import AboutReporting from './pages/Dashboard/AboutReporting.vue';
import NewContribution from './pages/Dashboard/NewContribution.vue';
import NewEvent from './pages/Dashboard/NewEvent.vue';
import NewSource from './pages/Dashboard/NewSource.vue';
import NewReport from './pages/Dashboard/NewReport.vue';
import ExportContributions from './pages/Dashboard/ExportContributions.vue';

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
        name: 'contribution',
        path: 'prispevki/:id',
        component: ContributionView,
      },
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
      {
        name: 'new-report',
        path: 'novo-porocilo',
        component: NewReport,
      },
      {
        name: 'export-contributions',
        path: 'izvozi-prispevke',
        component: ExportContributions,
      },
    ],
  },
];

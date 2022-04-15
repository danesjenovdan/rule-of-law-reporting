import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import NewReport from './components/NewReport.vue';
import NewEvent from './components/NewEvent.vue';
import NewSource from './components/NewSource.vue';

export const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    children: [
      { path: 'new-report', component: NewReport },
      { path: 'new-event', component: NewEvent },
      { path: 'new-source', component: NewSource },
    ],
  },
];

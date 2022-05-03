import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { plugin as formkit, defaultConfig, createInput } from '@formkit/vue';
import * as sl from './helpers/formkit-locale-sl.js';
import { routes } from './routes.js';
import App from './App.vue';
import MultiFile from './components/MultiFile.vue';

import './assets/css/bootstrap-reboot.min.css';
// eslint-disable-next-line import/no-unresolved
import '@formkit/themes/genesis';
import './assets/scss/main.scss';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(
  formkit,
  defaultConfig({
    locales: { sl },
    locale: 'sl',
    inputs: {
      multifile: createInput(MultiFile),
    },
  })
);

app.mount('#app');

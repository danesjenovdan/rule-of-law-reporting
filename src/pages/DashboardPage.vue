<template>
  <div class="dashboard-page">
    <RouterView />
  </div>
</template>

<script>
import { me } from '../helpers/api.js';

export default {
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await me();
          if (response?.data?.isAuthorized) {
            return;
          }
        } catch (error) {
          // fall through to redirect
        }
      }
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

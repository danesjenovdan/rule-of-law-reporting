<template>
  <div>
    <div class="buttons">
      <a href="/dashboard/new-report">dodaj prispevek</a>
      <a href="/dashboard/new-event">dodaj dogodek</a>
      <a href="/dashboard/new-source">dodaj vir</a>
    </div>
    <div>
      <RouterView />
    </div>
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
        const response = await me();
        if (response?.data?.isAuthorized) {
          return;
        }
      }
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>

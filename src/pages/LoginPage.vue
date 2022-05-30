<template>
  <div class="container">
    <div class="login-page">
      <div class="logo">
        <CircleLogo />
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import CircleLogo from '../components/Header/CircleLogo.vue';
import LoginForm from '../components/LoginForm.vue';
import { me } from '../helpers/api.js';

export default {
  components: {
    CircleLogo,
    LoginForm,
  },
  inject: {
    isDesktop: {
      default: false,
    },
  },
  mounted() {
    const { logout } = this.$route.query;
    if (logout) {
      localStorage.removeItem('token');
      this.$router.replace({ name: 'login' });
    } else {
      this.checkLogin();
    }
  },
  methods: {
    async checkLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await me();
          if (response?.data?.isAuthorized) {
            this.$router.push({ name: 'dashboard' });
          }
        } catch (error) {
          // not logged in, do nothing
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  margin: 5rem 0;
}
</style>

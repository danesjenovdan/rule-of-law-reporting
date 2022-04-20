<template>
  <div class="login-page">
    <div class="logo">
      <CircleLogo />
    </div>
    <div>
      <LoginForm />
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
  mounted() {
    const { logout } = this.$route.query;
    if (logout) {
      localStorage.removeItem('token');
      this.$router.replace('/login');
    } else {
      this.checkLogin();
    }
  },
  methods: {
    async checkLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await me();
        if (response?.data?.isAuthorized) {
          this.$router.push('/dashboard');
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

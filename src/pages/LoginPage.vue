<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { me } from '../helpers/api.js';

export default {
  components: {
    LoginForm,
  },
  mounted() {
    this.checkLogin();
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

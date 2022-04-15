<template>
  <div>
    <FormKit
      v-model="formData"
      type="form"
      submit-label="Prijavi se"
      @submit="submit"
    >
      <FormKit
        type="email"
        name="email"
        label="E-pošta"
        validation="required"
      />
      <FormKit
        type="password"
        name="password"
        label="Geslo"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script>
import { login } from '../helpers/api.js';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submit(data, node) {
      try {
        const response = await login(data.email, data.password);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        node.setErrors([errorMessage]);
      }
    },
  },
};
</script>
